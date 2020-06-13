import React, { Component } from 'react'

class Cover extends Component {
    render() {
        const { cover } = this.props;
        console.log(this.props.cover);
        return (
            <div>
                <section className="cover-sec">
                    <img src={cover} style={{  height: '450px' , backgroundSize: 'cover', backgroundRepeat: 'no-repeat, repeat'}} alt="Cover" />
                </section>
            </div>
        )
    }
}
export default Cover;
