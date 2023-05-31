import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [model, setModel] = useState("");
  const [sampler, setSampler] = useState("");
  const [step, setStep] = useState("");
  const [seed, setSeed] = useState("");

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 在這裡處理表單提交的邏輯
  };

  return (
    <div>
      <h2>上傳圖片</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="image">圖片選擇器：</Label>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </FormGroup>
        <FormGroup>
          <Label for="title">標題：</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="negativePrompt">Negative Prompt：</Label>
          <Input
            type="text"
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
            type="text"
            id="sampler"
            value={sampler}
            onChange={(e) => setSampler(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="step">Step：</Label>
          <Input
            type="text"
            id="step"
            value={step}
            onChange={(e) => setStep(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="seed">種子：</Label>
          <Input
            type="text"
            id="seed"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">上傳</Button>
      </Form>
    </div>
  );
};

export default UploadImage;
