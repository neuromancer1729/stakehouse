import React from 'react';
import { Button } from '@react95/core';

export default class PictureUploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: false,
      src: false
    }
  }

  triggerInputFile = () => this.fileInput.click()

  handlePictureSelected(event) {
    var picture = event.target.files[0];
    var src     = URL.createObjectURL(picture);

    this.setState({
      picture: picture,
      src: src
    });
  }

  renderPreview() {
    if(this.state.src) {
      return (
        <img src={this.state.src} height={100} width={100}/>
      );
    } else {
      return (
        <p>
          No Preview Available
        </p>
      );
    }
  }

  upload() {
    
  }

  render() {
    
    return (
      <div>
        <div>
        {this.renderPreview()}
        </div>

        <input
          type="file"
          onChange={this.handlePictureSelected.bind(this)}
          hidden={true}
          ref={fileInput => this.fileInput = fileInput}
        />
        <br/>
        <Button
          onClick={this.triggerInputFile}
        >
          Upload
        </Button>
      </div>
    );
  }
}