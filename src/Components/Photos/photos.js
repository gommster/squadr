import React, { Component } from 'react';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import './photos.css';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { connect } from 'react-redux';

class Photos extends Component {
  constructor() {
    super();
    this.state = {
      isUploading: false,
      photos: ['http://via.placeholder.com/450x450', 'http://via.placeholder.com/450x450', 'http://via.placeholder.com/450x450', 'http://via.placeholder.com/450x450', 'http://via.placeholder.com/450x450'],
      photoIndex: 0,
      photoTotal: 0,
      maxFiles: 0
    };
  }

  componentDidMount() {
    console.log('MOUNTING PHOTOS: ', this.state, this.props.profilePhoto1, this.props.profilePhoto2)
    if(this.props.profilePhoto1)
    {
      let photoArray = [this.props.profilePhoto1, this.props.profilePhoto2, this.props.profilePhoto3, this.props.profilePhoto4, this.props.profilePhoto5]
      this.setState({photos: photoArray})
      console.log('MOUNTED: ',this.state)
    }
    this.setState({maxFiles: 5})
  }

  getSignedRequest = async (files) => {
    console.log('GETSIGNEDREQUEST FILE: ', files, files.length, )
    let fileIndex = 0;
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    while(this.state.photoTotal + files.length<=5 && fileIndex < files.length){
      this.setState({ isUploading: true });
      const fileName = `${randomString()}-${files[fileIndex].name.replace(/\s/g, '-')}`;
      console.log('BEFORE FAIL: ', files[fileIndex], fileName)
      // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
      await axios
        .get('/api/signs3', {
          params: {
            'file-name': fileName,
            'file-type': files[fileIndex].type,
          },
        })
        .then(response => {
          const { signedRequest, url } = response.data;
          this.uploadFile(files[fileIndex], signedRequest, url, this.state.photoTotal);
        })
        .catch(err => {
          console.log(err);
        });
        fileIndex++;
        this.setState({photoTotal: this.state.photoTotal + 1, maxFiles: this.state.maxFiles-1})
    }
  };

  uploadFile = (file, signedRequest, url, fileIndex) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        let photoArray = this.state.photos;
        console.log('FILEINDEX: ',fileIndex)
        photoArray[fileIndex] = url;
        this.setState({ isUploading: false, photos: photoArray});
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
        this.props.setPhotos(this.state.photos);
      })
      .catch(err => {
        this.setState({
          isUploading: false,
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  render() {
    console.log('PHOTOS RENDER: ', this.state)
    const { photos, isUploading, photoIndex } = this.state;
    return (
      <div >
        <div className='displayedPhoto'>
          <img src={photos[photoIndex]} alt="" />
        </div>
        <div className='photoSelector' >
          <div className='miniPhoto'><img src={photos[0]} alt="" onClick={_=>this.setState({photoIndex: 0})} height='80px'></img></div>
          <div className='miniPhoto'><img src={photos[1]} alt="" onClick={_=>this.setState({photoIndex: 1})} height='80px'></img></div>
          <div className='miniPhoto'><img src={photos[2]} alt=""  onClick={_=>this.setState({photoIndex: 2})} height='80px'></img></div>
          <div className='miniPhoto'><img src={photos[3]} alt="" onClick={_=>this.setState({photoIndex: 3})} height='80px'></img></div>
          <div className='miniPhoto'><img src={photos[4]} alt="" onClick={_=>this.setState({photoIndex: 4})} height='80px'></img></div>
        </div>
        <Dropzone
          onDropAccepted={this.getSignedRequest}
          accept="image/*"
          multiple={true}
          maxFiles={this.state.maxFiles}
          disabled={!this.state.maxFiles}>
          {({getRootProps, getInputProps, acceptedFiles, fileRejections}) => {
            const acceptedFileItems = acceptedFiles.map(file=> {
              return (
              <li key={file.path}>
                {file.path} - {file.size} bytes
              </li>
            )});
            
            const rejectedFileItems = fileRejections.map(({file, errors})=>{
              return (
              <li key={file.path}>
                {file.path} - {file.size} bytes
                <ul>
                  {errors.map(e=><li key={e.code}>{e.message}</li>)}
                </ul>
              </li>
              )
            })

            return (
            <div className='inputBox'
              {...getRootProps()}>
              <input {...getInputProps()} />
              {isUploading ? <GridLoader /> : <p>{`Drop files here, or click to select files. Maximum of ${this.state.maxFiles} files.`} </p>}
              <h3>Accepted Files</h3>
              <ul>{acceptedFileItems}</ul>
              <h3>Rejected Files</h3>
              <ul>{rejectedFileItems}</ul>
            </div>
          )}}
         </Dropzone>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Photos);