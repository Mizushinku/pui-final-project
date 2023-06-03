import React, { useContext, useRef, useState } from "react";
import "./Upload.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { userCtx } from "../../contexts/userContext";
import UploadModal from "./UploadModal";

const UploadImage = () => {
  const { currUser } = useContext(userCtx);

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [model, setModel] = useState("");
  const [sampler, setSampler] = useState("");
  const [step, setStep] = useState("");
  const [seed, setSeed] = useState("");
  const [modal, setModal] = useState(false);

  const infoRef = useRef(undefined);

  const toggle = () => {
    setModal((prev) => !prev);
  };

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
    setPreviewImage(URL.createObjectURL(image));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 在這裡處理表單提交的邏輯
    infoRef.current = {
      uploader: currUser.uid,
      title: title,
      caption: caption,
      prompt: prompt,
      "negative prompt": negativePrompt,
      model: model,
      sampler: sampler,
      step: step,
      seed: seed,
    };
    toggle();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-col">
            <FormGroup>
              <Label for="image">圖片選擇器：</Label>
              <Input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
            </FormGroup>
            {previewImage && (
              <div className="preview-image-container">
                <img
                  src={previewImage}
                  alt="圖片預覽"
                  style={{ maxWidth: "500px", maxHeight: "500px" }}
                />
              </div>
            )}
            <div className="d-flex flex-row justify-content-center mt-5">
              <Button type="submit" className="px-5">
                上傳
              </Button>
            </div>
          </div>
          <div className="form-col">
            <FormGroup>
              <Label for="title">標題：</Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="caption">標語：</Label>
              <Input
                type="text"
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="prompt">Prompt：</Label>
              <Input
                type="textarea"
                rows="4"
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="negativePrompt">Negative Prompt：</Label>
              <Input
                type="textarea"
                rows="4"
                id="negativePrompt"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="model">Model：</Label>
              <Input
                type="text"
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="sampler">Sampler：</Label>
              <Input
                type="select"
                id="sampler"
                value={sampler}
                onChange={(e) => setSampler(e.target.value)}
              >
                <option></option>
                <option>Euler A</option>
                <option>DPM 2S a Karras</option>
                <option>DPM 2M a Karras</option>
                <option>DDIM</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="step">Step：</Label>
              <Input
                type="number"
                id="step"
                value={step}
                onChange={(e) => setStep(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="seed">Seed：</Label>
              <Input
                type="number"
                id="seed"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
      </Form>
      <UploadModal
        modal={modal}
        toggle={toggle}
        user={currUser}
        file={selectedImage}
        infoRef={infoRef}
      ></UploadModal>
    </div>
  );
};

export default UploadImage;
