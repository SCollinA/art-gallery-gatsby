import React from "react";
import LayoutContext from "../contexts/layoutContext";
import ArtworkChoice from "./ArtworkChoice";
import GalleryChoice from "./GalleryChoice";
import GalleryMain from "./GalleryMain";

export default class Gallery extends React.Component<any, any, any> {

    public galleryMain: React.RefObject<any>;
    public artworkChoice: React.RefObject<any>;
    public selectedArtworkRef: React.RefObject<any>;

    constructor(props: any) {
        super(props);
        this.state = {
            aspectRatio: 0,
            selectedArtwork: null,
            selectedGallery: {},
            windowHeight: 0,
            windowWidth: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.galleryMain = React.createRef();
        this.artworkChoice = React.createRef();
        this.selectedArtworkRef = React.createRef();
    }

    public componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        if (!this.state.selectedArtwork) {
            this.setState({
                selectedArtwork: this.context.galleries[0] &&
                    this.context.galleries[0].artworks[0],
                selectedGallery: this.context.galleries[0],
            });
        }
    }

    public componentDidUpdate() {
        if (this.state.selectedGallery.id === "none" && this.context.galleries[0].id !== "none") {
            this.setState({
                selectedGallery: this.context.galleries[0],
                selectedArtwork: this.context.galleries[0] &&
                    this.context.galleries[0].artworks[0],
            });
        }
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    public updateWindowDimensions() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    }

    public _selectGallery = (selectedGallery: any) => this.setState({
        selectedArtwork: selectedGallery.artworks[0],
        selectedGallery,
    }, () => {
        const artworkChoice = this.artworkChoice.current;
        artworkChoice.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    })

    public _selectArtwork = (selectedArtwork: any) => this.setState({
        selectedArtwork,
   }, () => {
        const galleryMain = this.galleryMain.current;
        galleryMain.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
   })

    public render() {
        return (
            <div className="Gallery">
                <GalleryChoice
                    galleries={this.context.galleries}
                    selectGallery={this._selectGallery}
                    selectedGallery={this.state.selectedGallery}
                />
                <GalleryMain galleryMainRef={this.galleryMain}
                    selectedGallery={this.state.selectedGallery}
                    selectedArtwork={this.state.selectedArtwork}
                    // selectedArtworkRef={this.selectedArtworkRef}
                    windowHeight={this.state.windowHeight}
                />
                <ArtworkChoice artworkChoiceRef={this.artworkChoice}
                    selectedGallery={this.state.selectedGallery}
                    selectArtwork={this._selectArtwork}
                    selectedArtwork={this.state.selectedArtwork}
                />
            </div>
        );
    }
}

Gallery.contextType = LayoutContext;
