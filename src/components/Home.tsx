import Img from "gatsby-image";
import GatsbyImage from "gatsby-image";
import React, { RefObject } from "react";
import LayoutContext from "../contexts/layoutContext";

export default class Home extends React.Component<any, any, any> {
    public image: React.RefObject<any>;
    public gatsbyImage: string | ((instance: GatsbyImage | null) => void) | RefObject<GatsbyImage> | null | undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            aspectRatio: 0,
            height: 0,
            randomImageNumber: Math.random(),
            width: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.image = React.createRef();
    }

    public componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    public updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    public render() {
    return (
    <div className="Home">
        {/* random artwork */}
        <div className="randomArtwork">
            <LayoutContext.Consumer>
                {({ galleries }: any) => {
                    const randomGallery = galleries[Math.floor(this.state.randomImageNumber * galleries.length)];
                    const randomArtwork = randomGallery.artworks[
                        Math.floor(this.state.randomImageNumber * randomGallery.artworks.length)
                    ];
                    return (!randomArtwork && <p>whoops, no picture</p>) || (
                        (randomArtwork.file && (
                            <Img ref={this.gatsbyImage}
                                style={{
                                    maxWidth: randomArtwork.file.childImageSharp.fluid.aspectRatio <= 1 ?
                                        `${(this.state.height * .75) * randomArtwork.file.childImageSharp.fluid.aspectRatio}px` :
                                        `100%`,
                                }}
                                fluid={randomArtwork.file.childImageSharp.fluid}
                            />
                        )) || (
                        randomArtwork.image && (
                            <img ref={this.image}
                                style={{ display: "none" }}
                                src={`data:image/jpeg;base64,${randomArtwork.image}`}
                                alt={randomArtwork.title}
                                onLoad={() => {
                                    const dbImage = this.image.current;
                                    const aspectRatio = dbImage.width / dbImage.height;
                                    dbImage.style.width = `${(this.state.height * .75) * aspectRatio}px`;
                                    dbImage.style.height = `${(this.state.width * .75) * 1 / aspectRatio}px`;
                                    dbImage.style.display = "inherit";
                                }}
                            />
                        ))
                    );
                }}
            </LayoutContext.Consumer>
        </div>
        <div className="welcomeMessage">
            <h4>Welcome!</h4>
            <p>
                Thank you for your interest in my art.
                I work in oil, watercolor, and pastels creating inspired work and commissions.
                Browse the gallery and let me hear from you! I'm always interested in your feedback.
            </p>
        </div>
    </div>
    );
    }
}

