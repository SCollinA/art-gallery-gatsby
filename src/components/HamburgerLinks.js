import React from 'react'
import PageLinks from './PageLinks';
import SocialLinks from './SocialLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class HamburgerLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: false,
        }
    }
    
    render(){
        return (
            <div className='HamburgerLinks' 
                onClick={() => {
                    this.setState({
                        isExpanded: !this.state.isExpanded
                    })
                }}
            >
                <FontAwesomeIcon icon={['far', 'times-circle']} size='3x' />
                {this.state.isExpanded && (
                    <>
                        <PageLinks />
                        <SocialLinks />
                    </>
                )}
            </div>
        )
    } 
}