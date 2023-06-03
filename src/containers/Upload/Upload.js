import React, { useContext, useEffect, useRef, useState } from "react";
import "./Upload.css";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { userCtx } from "../../contexts/userContext";
import UploadModal from "./UploadModal/UploadModal";
import { useLocation } from "react-router-dom";

const UploadImage = () => {
  const { currUser } = useContext(userCtx);

  const [inputKey, setInputKey] = useState(Date.now());
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [info, setInfo] = useState({
    title: "",
    caption: "",
    prompt: "",
    negativePrompt: "",
    model: "",
    sampler: "",
    step: "",
    seed: "",
    fav: 0,
  });
  const [modal, setModal] = useState(false);

  const infoRef = useRef(undefined);

  const location = useLocation();

  useEffect(() => {
    setInputKey(Date.now());
    setSelectedImage(null);
    setPreviewImage(null);
    setInfo({
      title: "",
      caption: "",
      prompt: "",
      negativePrompt: "",
      model: "",
      sampler: "",
      step: "",
      seed: "",
      fav: 0,
    });
  }, [location]);

  const toggle = () => {
    setModal((prev) => !prev);
  };

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    if (image) {
      setSelectedImage(image);
      setPreviewImage(URL.createObjectURL(image));
      setInfo((prev) => ({ ...prev, title: image.name.split(".")[0] }));
    } else {
      setSelectedImage(null);
      setPreviewImage(null);
      setInfo((prev) => ({ ...prev, title: "" }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 在這裡處理表單提交的邏輯
    infoRef.current = {
      uploader: currUser.uid,
      ...info,
    };
    toggle();
  };

  const sampler_list = [
    "",
    "Euler A",
    "Euler",
    "LMS",
    "Heun",
    "DPM2",
    "DPM2 a",
    "DPM++ 2S a",
    "DPM++ 2M",
    "DPM++ SDE",
    "DPM++ 2M SDE",
    "LMS Karras",
    "DPM2 Karras",
    "DPM2 a Karras",
    "DPM++ 2S a Karras",
    "DPM++ 2M Karras",
    "DPM++ SDE Karras",
    "DPM++ 2M SDE Karras",
    "DDIM",
    "PLMS",
    "UniPC",
  ];

  const [autoFill, setAutoFill] = useState("");
  const autoFillData = () => {
    const str = autoFill;
    let endTag = ",";
    let startTag, startIndex, endIndex;
    // steps
    startTag = "Steps: ";
    startIndex = str.lastIndexOf(startTag) + startTag.length;
    endIndex = str.indexOf(endTag, startIndex);
    const af_steps =
      startIndex != -1 && endIndex != -1
        ? str.slice(startIndex, endIndex).trim()
        : "";
    // seeds
    startTag = "Seed: ";
    startIndex = str.lastIndexOf(startTag) + startTag.length;
    endIndex = str.indexOf(endTag, startIndex);
    const af_seed =
      str.lastIndexOf(startTag) != -1 && endIndex != -1
        ? str.slice(startIndex, endIndex).trim()
        : "";
    //CFG scale
    startTag = "CFG scale: ";
    startIndex = str.lastIndexOf(startTag) + startTag.length;
    endIndex = str.indexOf(endTag, startIndex);
    const af_cfg =
      str.lastIndexOf(startTag) != -1 && endIndex != -1
        ? str.slice(startIndex, endIndex).trim()
        : "";
    //model
    startTag = "Model hash: ";
    startIndex = str.lastIndexOf(startTag) + startTag.length;
    endIndex = str.indexOf(endTag, startIndex);
    const af_model =
      str.lastIndexOf(startTag) != -1 && endIndex != -1
        ? str.slice(startIndex, endIndex).trim()
        : "";
    //sampler
    startTag = "Sampler: ";
    startIndex = str.lastIndexOf(startTag) + startTag.length;
    endIndex = str.indexOf(endTag, startIndex);
    const af_sampler =
      str.lastIndexOf(startTag) != -1 && endIndex != -1
        ? str.slice(startIndex, endIndex).trim()
        : "";
    //negative prompt
    endTag = "Steps:";
    startTag = "Negative prompt: ";
    startIndex = str.lastIndexOf(startTag) + startTag.length;
    endIndex = str.indexOf(endTag, startIndex);
    const af_negativePrompt =
      str.lastIndexOf(startTag) != -1 && endIndex != -1
        ? str.slice(startIndex, endIndex).trim()
        : "";
    //prompt
    endTag = "Negative prompt: ";
    startIndex = 0;
    endIndex = str.indexOf(endTag, startIndex);
    const af_prompt =
      str.lastIndexOf(startTag) != -1 && endIndex != -1
        ? str.slice(startIndex, endIndex).trim()
        : "";
    setInfo((prev) => ({
      ...prev,
      step: af_steps,
      seed: af_seed,
      model: af_model,
      sampler: af_sampler,
      negativePrompt: af_negativePrompt,
      prompt: af_prompt,
    }));
    console.log(info);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-col">
            <FormGroup>
              <Label for="image">圖片選擇器：</Label>
              <Input
                key={inputKey}
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

            <FormGroup>
              <Label for="auto-fill">Auto Fill：</Label>
              <Row>
                <Col>
                  <Input
                    type="textarea"
                    rows="4"
                    id="auto-fill"
                    className="w-100"
                    value={autoFill}
                    onChange={(e) => {
                      setAutoFill(e.target.value);
                    }}
                  />
                </Col>
                <Col xs="auto" className="d-flex justify-content-center">
                  <Button
                    type="button"
                    className="btn btn-primary"
                    onClick={autoFillData}
                  >
                    Fill
                  </Button>
                </Col>
              </Row>
            </FormGroup>
            <div className="d-flex flex-row justify-content-center mt-5">
              <Button type="submit" color="primary" className="px-5">
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
                value={info.title}
                // onChange={(e) => setTitle(e.target.value)}
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="caption">標語：</Label>
              <Input
                type="text"
                id="caption"
                value={info.caption}
                // onChange={(e) => setCaption(e.target.value)}
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, caption: e.target.value }))
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="prompt">Prompt：</Label>
              <Input
                type="textarea"
                rows="4"
                id="prompt"
                value={info.prompt}
                // onChange={(e) => setPrompt(e.target.value)}
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, prompt: e.target.value }))
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="negativePrompt">Negative Prompt：</Label>
              <Input
                type="textarea"
                rows="4"
                id="negativePrompt"
                value={info.negativePrompt}
                // onChange={(e) => setNegativePrompt(e.target.value)}
                onChange={(e) =>
                  setInfo((prev) => ({
                    ...prev,
                    negativePrompt: e.target.value,
                  }))
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="model">Model：</Label>
              <Input
                type="text"
                id="model"
                value={info.model}
                // onChange={(e) => setModel(e.target.value)}
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, model: e.target.value }))
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="sampler">Sampler：</Label>
              <Input
                type="text"
                id="sampler"
                value={info.sampler}
                // onChange={(e) => setSampler(e.target.value)}
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, sampler: e.target.value }))
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="step">Step：</Label>
              <Input
                type="number"
                id="step"
                value={info.step}
                // onChange={(e) => setStep(e.target.value)}
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, step: e.target.value }))
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="seed">Seed：</Label>
              <Input
                type="number"
                id="seed"
                value={info.seed}
                // onChange={(e) => setSeed(e.target.value)}
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, seed: e.target.value }))
                }
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
