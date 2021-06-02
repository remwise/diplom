import React, { useRef, useState } from 'react';
import { Button, Uploader } from 'rsuite';

// class HomePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: [],
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleUpload = this.handleUpload.bind(this);
//     this.handleReupload = this.handleReupload.bind(this);
//   }

//   handleChange(value) {
//     this.setState({ value });
//   }
//   handleUpload() {
//     this.uploader.start();
//   }
//   handleReupload(file) {
//     console.log(file);
//     this.uploader.start(file);
//   }
//   render() {
//     return (
//       <div>
//         <Uploader
//           autoUpload={false}
//           action="/api/files/upload.php"
//           onChange={this.handleChange}
//           ref={ref => {
//             this.uploader = ref;
//           }}
//         />
//         <hr />
//         <Button disabled={!this.state.value.length} onClick={this.handleUpload}>
//           Start Upload
//         </Button>
//       </div>
//     );
//   }
// }

const HomePage = () => {
  // const uploader = useRef(null);
  // const [file, setFile] = useState();

  return (
    <div>
      <h1>HOME PAGE</h1>
      {/* <div>
        <Uploader ref={uploader} autoUpload={false} action="/api/files/upload.php" name="file" onChange={file => setFile(file)} />
        <hr />
        <Button disabled={!file} onClick={() => uploader.current.start()}>
          Start Upload
        </Button>
      </div> */}
    </div>
  );
};

export default HomePage;
