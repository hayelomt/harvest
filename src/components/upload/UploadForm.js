import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
  FormText
} from 'reactstrap';
import './upload.scss';
import { PRODUCTS_API_URL } from '../../utils/URLS';

const UploadForm = props => {
  const [name, setName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('crop');
  const [image, setImage] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    quantity: '',
    price: '',
    category: ''
  });

  const resetStates = () => {
    setName('');
    setUploading(false);
    setQuantity('');
    setPrice('');
    setDescription('');
    setStatus('');
    setCategory('');
    setImage('');
    setUploadedImage('');
    setErrors({
      name: '',
      quantity: '',
      price: '',
      category: ''
    });
  };
  useEffect(() => {
    // e.preventDefault();
    // console.log('--------------------', image);
    // console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', image);

    const fetchData = async () => {
      try {
        const res = await axios.post('/api/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const { filen, filepath } = res.data;
        setUploadedImage({ filen, filepath });
      } catch (err) {
        console.log(err);
        if (err.response.status === 500) {
          console.log('There was a problem with the server');
        } else {
          console.log(err.response.data.msg);
        }
      }

      // console.log('submission ended');
    };
    if (image) {
      // console.log('-----=========');
      fetchData();
    }
    // axios.post('/api/upload', formdata, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    // }).then(res => {
    //   console.log(res);
    // })
    // .catch(err => console.log(err))
  }, [image]);

  const handleFileChange = e => {
    // console.log(e.target.files, e.target.files[0]);
    setImage(e.target.files[0]);
    // handleImageUpload(e);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUploading(true);
    const data = {
      name,
      quantity,
      price,
      category: category.toUpperCase(),
      imageurl: image.name,
      description
    };

    // axios
    //   .get('/api/upload')
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log(err));
    // console.log(data);
    axios
      .post(PRODUCTS_API_URL, data)
      .then(res => {
        // console.log('frontend response:', res);
        const stat = res.data.status;

        setErrors({ name: '', quantity: '', price: '', category: '' });
        setStatus(stat);

        setUploading(false);
      })
      .catch(err => {
        // console.log(err);
        setErrors(err.response.data.data);
        setStatus(err.status);
        setUploading(false);

        // console.log(err.status);

        // console.log(err);
      });
    resetStates();
  };

  //   useEffect(() => {
  //     axios
  //       .get('/upload')
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(err => console.log(err));
  //   });

  return (
    <React.Fragment>
      <Form className="upload-form">
        <div className="upload-form-header">
          <span>
            Seller: &nbsp;
            {/*get from userinfo*/}
            State farm x
          </span>
          <br />
          <span>
            Location: &nbsp;
            {/*get from userinfo*/}
            Melkasa
          </span>
        </div>
        <FormGroup className="upload-form-group">
          <Label for="productname">Product Name</Label>
          <Input
            className="text-field"
            type="text"
            name="name"
            placeholder="Onion"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <FormText color="danger">{errors.name}</FormText>
        </FormGroup>
        <FormGroup className="upload-form-group">
          <Label for="quantity">Quantity (Kg)</Label>
          <Input
            className="text-field"
            type="Number"
            name="quantity"
            placeholder=""
            value={quantity}
            onChange={e => {
              setQuantity(e.target.value);
            }}
          />
          <FormText color="danger">{errors.quantity}</FormText>
        </FormGroup>
        <FormGroup className="upload-form-group">
          <Label for="price">Price (ETB)</Label>
          <Input
            className="text-field"
            type="Number"
            name="price"
            placeholder=""
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <FormText color="danger">{errors.price}</FormText>
        </FormGroup>
        <FormGroup className="upload-form-group">
          <Label for="productCategory">Category</Label>
          <Input
            className="select"
            type="select"
            name="category"
            value={category}
            onChange={e => {
              console.log(e.target.value);
              setCategory(e.currentTarget.value);
            }}
          >
            <option>Crop</option>
            <option>Cereal</option>
            <option>Fruit</option>
            <option>Vegitables</option>
            <option>Dairy</option>
          </Input>
          <FormText color="danger">{errors.category}</FormText>
        </FormGroup>
        <FormGroup className="upload-form-group">
          <Label for="description">Descripton</Label>
          <Input
            className="text-area effect3"
            type="textarea"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="upload-form-group">
          <Label for="imageurl">Image (optional)</Label>
          <Input
            className=""
            type="file"
            id="exampleFile"
            onChange={handleFileChange}
          />
          {uploadedImage ? (
            <div>
              <p>{uploadedImage.filen}</p>
              <img
                width="100"
                height="100"
                src={uploadedImage.filepath}
                alt={uploadedImage.filen}
              />
            </div>
          ) : null}
          {/* <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText> */}
        </FormGroup>

        <Button className="submit-btn" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        {uploading && <Spinner color="success" />}
        {status && (
          <Alert
            className="notification"
            color={status === 'success' ? 'success' : 'danger'}
          >
            {status}
          </Alert>
        )}
      </Form>
    </React.Fragment>
  );
};

export default UploadForm;
