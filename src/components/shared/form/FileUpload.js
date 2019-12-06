import React from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import * as actions from '../../../actions/index';


export class FileUpload extends React.Component {

    constructor() {
        super();

        this.setupReader();
        this.state = {
            selectedFile: undefined,
            imageBase64: '',
            pending: false,
            status: 'INIT',
        };
        this.onChange = this.onChange.bind(this);
    }

    setupReader() {
        this.reader = new FileReader();
        this.reader.addEventListener('load', (event) => {
          this.setState({
              imageBase64: event.target.result
          });
        });
    }

    onChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            this.setState({
                selectedFile,
            });
            this.reader.readAsDataURL(selectedFile);
        }
    }

    onError(error) {
        this.setState({
            pending: false,
            status: 'FAIL'
        });
    }

    onSuccess(uploadedImage) {
        const { input: {onChange} } = this.props;
        this.setState({
            pending: false,
            status: 'OK'
        });
        onChange(uploadedImage);  
    }


    uploadImage() {
        const { selectedFile } = this.state;
        if (selectedFile) {
            this.setState({
                pending: true,
                status: 'INIT'
            });
            actions.uploadImage(selectedFile).then(
                (uploadImage) => {
                    this.onSuccess(uploadImage);
                },
                (error) => {
                    this.onError(error);
                }
            )
        }
    }

    renderSpinningCircle() {
        const { pending } = this.state;
        if (pending) {
            return (
                <div className='img-loading-overlay'>
                    <div className='img-spinning-circle'>

                    </div>
                </div>
            )
        }
    }

    renderImageStatus() {
        const { status } = this.state;
        if (status == 'OK') {
            return <div className='alert alert-success'>Image uploaded successfully!</div>
        }
        if (status == 'FAIL') {
            return <div className='alert alert-danger'>Image upload failed!</div>
        }
    }

    render() {

        const { label, meta: {touched, error} } = this.props;
        const { selectedFile, imageBase64 } = this.state;

        return (
            <div className='img-upload-container'>
                <label className='image-upload btn btn-bwm'>
                    <span className='upload-text'>Select Image</span>
                    <input type='file' accept='./jpg, ./png, .jpeg' onChange={this.onChange}/>
                </label>
                { selectedFile &&
                    <button 
                    className='btn btn-success btn-upload position' 
                    type='button' disabled={!selectedFile} 
                    onClick={() => this.uploadImage()}>
                        Upload Image
                    </button>
                }
                {touched && ((error && <div className='alert alert-danger'>{error}</div>))}
                { imageBase64 &&
                    <div className='img-preview-container'>
                        <div className='img-preview' style={{'backgroundImage': 'url(' + imageBase64 + ')'}}>
                        </div>
                        {this.renderSpinningCircle()}
                    </div>
                }
                {this.renderImageStatus()}
            </div>
        )
    }

}




function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
  
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(file => {
        file.name = fileName;
        resolve(file);
      }, 'image/jpeg', 1);
    });
  }
