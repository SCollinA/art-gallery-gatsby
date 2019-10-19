import gql from "graphql-tag";
import React from "react";
import {  Mutation } from "react-apollo";

import AdminContext from "../contexts/adminContext";

// import { ALL_GALLERIES } from './AdminGalleries'
import { DB_CONTENT } from "../graphql/graphql";

export default () => {
    return (
        <AdminContext.Consumer>
            {({ selectGallery }: any) => (
                    <Mutation mutation={ADD_GALLERY}
                        update={(cache: any, { data: { addGallery } }: any) => {
                            // immediately select the gallery for updating
                            const { id, name } = addGallery;
                            // select once to get artwork
                            selectGallery({
                                id,
                                name,
                            });
                            // select again to make available for editing
                            selectGallery({
                                id,
                                name,
                            });
                            const { galleries, artworks } = cache.readQuery({ query: DB_CONTENT });
                            console.log(galleries);
                            cache.writeQuery({
                                query: DB_CONTENT,
                                data: { artworks, galleries: galleries.concat([addGallery]) },
                            });
                            // const { getAllGalleries } = cache.readQuery({ query: ALL_GALLERIES })
                            // cache.writeQuery({
                            //     query: ALL_GALLERIES,
                            //     data: { getAllGalleries: getAllGalleries.concat([addGallery]) },
                            // })
                        }}
                        >
                        {(addGallery: any, { data, loading, error }: any) => {
                            return (
                            <div className="AddGalleries"
                                onClick={addGallery}
                            >
                                <div className="addGallery">
                                    <h3> + </h3>
                                </div>
                            </div>
                        ); }}
                    </Mutation>
            )}
        </AdminContext.Consumer>
    );
};

const ADD_GALLERY = gql`
    mutation {
        addGallery(input: { name: "new collection" }) {
            id
            name
        }
    }
`;
