const { gql, PubSub } = require('apollo-server')
const pubsub = new PubSub()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const serviceKey = require('./service_key.json')
const fs = require('fs')


const Artwork = require('./Artwork')
const Gallery = require('./Gallery')

// The GraphQL schema
const typeDefs = gql`
    input ArtworkInput {
        id: ID
        galleryId: ID
        title: String 
        width: Int
        height: Int
        medium: String
        image: String
        price: Int
        sold: Boolean
        framed: Boolean
        recentlyupdatedimage: Boolean
    }
    
    input GalleryInput {
        id: ID
        name: String
        artworkIds: [ID]
        artworks: [ArtworkInput]
    }

    type Query {
        "get a collection of artworks"
        getGallery(id: ID!): Gallery
        getGalleries(input: GalleryInput!): [Gallery]!
        getAllGalleries: [Gallery]!
        "get a single artwork"
        getArtwork(id: ID): Artwork
        getArtworks(input: ArtworkInput!): [Artwork]!
        getAllArtworks: [Artwork]!
    }
    
    type Mutation {
        addGallery(input: GalleryInput!): Gallery!
        updateGallery(id: ID!, input: GalleryInput!): Gallery!
        deleteGallery(id: ID!): Boolean
        addArtwork(input: ArtworkInput!): Artwork!
        updateArtwork(id: ID!, input: ArtworkInput): Artwork!
        deleteArtwork(id: ID!): Boolean

        "admin login"
        login(password: String!): AuthPayload!

        contactArtist(name: String, contactEmail: String, message: String, artwork: String): Boolean
    }

    type Subscription {
        artworkImageChanged: Artwork
    }

    type AuthPayload {
        token: String
    }

    type Gallery {
        id: ID!
        name: String
    }

    type Artwork {
        id: ID!
        galleryId: ID 
        title: String
        width: Int
        height: Int
        medium: String
        image: String
        price: Int
        sold: Boolean
        framed: Boolean
        recentlyupdatedimage: Boolean
    }
`

// subscription name
const ARTWORK_IMAGE_CHANGED = `ARTWORK_IMAGE_CHANGED`

// A map of functions which return data for the schema.
const resolvers = {
    // get
    Query: {
        getGallery: (obj, args, context, info) => {
            return Gallery.findOne({ where: { id: args.id } })
        },
        getGalleries: (obj, args, context, infor) => {
            return Gallery.findAll({
                where: args.input
            })
        },
        getAllGalleries: (obj, args, context, info) => {
            return Gallery.findAll()
        },
        getArtwork: (obj, args, context, info) => {
            return Artwork.findOne({ where: { id: args.id } })
        },
        getArtworks: (obj, args, context, info) => {
            return Artwork.findAll({
                where: args.input,
                order: [['title', 'ASC']]
            })
        },
        getAllArtworks: (obj, args, context, info) => {
            return Artwork.findAll({order: [['title', 'ASC']]})
        }
    },
    // set
    Mutation: {
        addGallery: (obj, args, context, info) => {
            require('./utils').checkLoggedIn(context)
            return Gallery.create({ ...args.input })
        },
        updateGallery: (obj, args, context, info) => {
            require('./utils').checkLoggedIn(context)
            return Gallery.update({ ...args.input }, { 
                where: { id: args.id },
            })
            .then(() => Gallery.findByPk(args.id))
        },
        deleteGallery: (obj, args, context, info) => {
            require('./utils').checkLoggedIn(context)
            return Gallery.destroy({ where: { id: args.id } })
            .then(() => {
                Artwork.findAll({ where: { galleryId: args.id }})
                .then(galleryArtworks => {
                    galleryArtworks.forEach(galleryArtwork => {
                        fs.unlink(`../art-gallery-gatsby/src/images/artworks/${args.id}.jpeg`,
                            err => {
                                if (err) { console.log('artwork image file not deleted', err) }
                                else { console.log('artwork image file deleted') }
                            })
                    })
                })
                .then(() => {
                    Artwork.destroy({ where: { galleryId: args.id }})
                })
            })
        },
        addArtwork: (obj, args, context, info) => {
            require('./utils').checkLoggedIn(context)
            return Artwork.create({ ...args.input })
        },
        updateArtwork: (obj, args, context, info) => {
            require('./utils').checkLoggedIn(context)
            // check if image is less than 5 MB
            const image = args.input.image && args.input.image.length < 5000000 ? 
                args.input.image : ''
            Artwork.findByPk(args.id)
            .then(artwork => {
                try {
                    fs.renameSync(`../art-gallery-gatsby/src/images/artworks/${args.input.id}-${artwork.title}.jpeg`,
                        `../art-gallery-gatsby/src/images/artworks/${args.input.id}-${args.input.title}.jpeg`,
                        err => console.log(err)
                    )
                } catch (err) { 
                    console.log('could not rename image file', err)
                    try {
                        fs.renameSync(`../art-gallery-gatsby/src/images/artworks/${args.input.id}.jpeg`,
                            `../art-gallery-gatsby/src/images/artworks/${args.input.id}-${args.input.title}.jpeg`,
                            err => console.log(err)
                        )
                    } catch (err) { 
                        console.log('could not rename original image file name either', err)
                    }
                }
            })
            .then(() => {
                try {
                    if (image) { // user submitted artwork without image
                        // fs.unlink(`../art-gallery-gatsby/src/images/artworks/${args.input.id}-${args.input.title}.jpeg`,
                        // err => {
                        //     if (err) { console.log('artwork image file not deleted', err) }
                        //     else { console.log('artwork image file deleted') }
                        // })
                    // } else {
                        // image && 
                        // write file always in order to overwrite reused artwork IDs
                        fs.writeFile(
                            `../art-gallery-gatsby/src/images/artworks/${args.input.id}-${args.input.title}.jpeg`,
                            image,
                            {
                                encoding: 'base64',
                                flag: 'w+',
                            }, 
                            err => {
                                if (err) {
                                    fs.mkdir('../art-gallery-gatsby/src/images/artworks/',
                                        err => {
                                            if (err) { return console.log('could not mkdir for artwork', err) }
                                            else {
                                                fs.writeFile(
                                                    `../art-gallery-gatsby/src/images/artworks/${args.input.id}-${args.input.title}.jpeg`,
                                                    image,
                                                    {
                                                        encoding: 'base64',
                                                        flag: 'w+',
                                                    },
                                                    err => {
                                                        if (err) { console.log('could not write artwork image to file', err) }
                                                        else { console.log('artwork image written to file') }
                                                    }
                                                )
                                            }
                                        }
                                    )  
                                } 
                            }
                        )
                    }
                } catch (err) { console.log('could not write artwork image to file', err) }
            })
            .catch(console.log)
            pubsub.publish(ARTWORK_IMAGE_CHANGED, { artworkImageAdded: args });
            if (image) {
                args.input.image = image;
            }
            return Artwork.update({ ...args.input }, { 
                where: { id: args.id },
                // returning: true
            })
            .then(() => Artwork.findByPk(args.id))
            .catch(err => console.log('could not update artwork', err))
        },
        deleteArtwork: (obj, args, context, info) => {
            require('./utils').checkLoggedIn(context)
            fs.unlink(`../art-gallery-gatsby/src/images/artworks/${args.id}.jpeg`,
            err => {
                if (err) { console.log('artwork image file not deleted', err) }
                else { console.log('artwork image file deleted') }
            })
            return Artwork.destroy({ where: { id: args.id } })
        }, 
        login: (obj, args, context, info) => {
            const { APP_SECRET, ADMIN_PW } = process.env
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds)
            const pwHash = bcrypt.hashSync(ADMIN_PW, salt)
            const pwMatch = bcrypt.compareSync(args.password, pwHash)
            
            if (!pwMatch) { throw new Error('bad password') }
            console.log('good password')
            const token = jwt.sign({ isLoggedIn: true }, APP_SECRET, {
                expiresIn: 60 * 60 * 24 // expires in one day
            })
            return { token }
        },
        contactArtist: (obj, args, context, info) => {
            const { name, contactEmail, message, artwork } = args
            const email = 'hi@collinargo.com'
            const jwtClient = new google.auth.JWT(
                serviceKey.client_email,
                null,
                serviceKey.private_key,
                ['https://mail.google.com/'],
                null,
                serviceKey.private_key_id
            )
            jwtClient.authorize((error, tokens) => {
                if (error) {
                    console.log('could not authorize', error)
                    return false
                }
                console.log('Successfully got access token! token: ', tokens)
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        type: 'OAuth2',
                        user: email,
                        serviceClient: serviceKey.client_id,
                        privateKey: serviceKey.private_key,
                        accessToken: tokens.access_token,
                        expires: tokens.expiry_date
                    }
                })
                transporter.sendMail({
                    from: 'An Example <' + contactEmail + '>', // this is being overwritten by gmail
                    to: process.env.CLIENT_EMAIL,
                    subject: 'art gallery contact',
                    text: `
                        ${name}
                        ${message}
                        ${artwork}

                        - reply directly to this e-mail to respond - 

                    `,
                    replyTo: contactEmail 
                }, (error, info) => {
                    if (error) {
                        console.log('contact e-mail not sent!', error, info)
                        return false
                    } else { return true }
                })
            })
        }
    },
    // subscribe
    Subscription: {
        artworkImageChanged: {
            subscribe: () => pubsub.asyncIterator(['ARTWORK_IMAGE_CHANGED'])
        }
    }
}

module.exports = {
    typeDefs,
    resolvers,
}