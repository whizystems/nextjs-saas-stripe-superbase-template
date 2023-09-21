'use client';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Slider } from '@/components/ui/slider';

type GenerationValues = {
  CCS: number;
  strength: number;
  guidanceScale: number;
}

export default function SpaceUI() {
  const promptRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const negPromptRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string>('');
  const [genValues, setGenValues] = useState<GenerationValues>({
    CCS: 1.3,
    strength: 0.8,
    guidanceScale: 8,
  });

  const updateOutputValue = async () => {
    if (promptRef.current && urlRef.current) {
      try {
        const res = await queryImage({ inputs: 
          {
            "prompt": promptRef.current.value,
            "negative_prompt": negPromptRef?.current?.value ?? "",
            "qr_code_content": urlRef.current.value,
            "guidance_scale": genValues.guidanceScale,
            "controlnet_conditioning_scale": genValues.CCS,
            "strength": genValues.strength
          }
        });
        const binaryString = atob(res.image);
        const imgUrl = `data:image/jpeg;base64,${btoa(binaryString)}`;
        setImageURL(imgUrl);
        setImage(imgUrl);
      } catch (error) {
        console.error('Error querying API:', error);
      }
    }
  };

  async function queryImage(data: { inputs: any }) {
    const response = await fetch(
      'http://localhost:8000/get_image_as_base64',
      {
        headers: { Authorization: 'Bearer ', "Content-Type": "application/json" },
        method: 'POST',
        // body: JSON.stringify(data),
      }
    );
    return await response.json();
  }

  const updateCCS = (value: number) => {
    setGenValues((prevState) => ({
      ...prevState,
      CCS: value,
    }));
  };

  const updateStrength = (value: number) => {
    setGenValues((prevState) => ({
      ...prevState,
      strength: value,
    }));
  };

  const updateGuidanceScale = (value: number) => {
    setGenValues((prevState) => ({
      ...prevState,
      guidanceScale: value,
    }));
  };

  const handleDownload = () => {
    const anchor = document.createElement('a');
    anchor.href = imageURL;
    anchor.download = 'image.png'; // You can set the desired file name here
    anchor.click();
  };

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="max-w-2xl mt-100 flex flex-col">
        <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl mb-8">
          Try out our AI widget
        </h1>
        <div className="flex flex-row space-x-8">
          {/* Input */}
          <div className="flex-1">
            <div className="flex flex-col space-y-3">
              <h2 className="text-white font-bold">URL</h2>
              <Input ref={urlRef} id="url" />
              <h2 className="text-white font-bold">Prompt</h2>
              <Input ref={promptRef} id="prompt" />
              <h2 className="text-white font-bold">Negative Prompt</h2>
              <Input ref={negPromptRef} id="negativePrompt" />

              <div className="slider-container">
                <label className="text-white">Controlnet Conditioning Scale</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Slider
                    id="ccs"
                    min={0}
                    defaultValue={[genValues.CCS]}
                    value={[genValues.CCS]}
                    max={5}
                    step={0.01}
                    onValueChange={(value) => updateCCS(value[0])}
                  />
                  <span className='text-white ml-2'>{genValues.CCS}</span>
                </div>
              </div>


              <div className="slider-container">
                <label className="text-white">Strength</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Slider
                    id="strength"
                    min={0}
                    defaultValue={[genValues.strength]}
                    value={[genValues.strength]}
                    max={1}
                    step={0.01}
                    onValueChange={(value) => updateStrength(value[0])}
                  />
                  <span className='text-white ml-2'>{genValues.strength}</span>
                </div>
              </div>

              <div className="slider-container">
                <label className="text-white">Guidance Scale</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Slider
                    id="guidanceScale"
                    min={0}
                    defaultValue={[genValues.guidanceScale]}
                    value={[genValues.guidanceScale]}
                    max={50}
                    step={0.25}
                    onValueChange={(value) => updateGuidanceScale(value[0])}
                  />
                  <span className='text-white ml-2'>{genValues.guidanceScale}</span>
                </div>
              </div>
              <Button onClick={updateOutputValue}>Submit</Button>
            </div>
          </div>

          {/* Output */}
          <div className="flex-1">
            <div className="flex flex-col space-y-3">
              <h2 className="text-white font-bold">Result</h2>
              <div className="flex-1">
                {image ? (
                  <div>
                    <img src={image} alt="API Image" />
                    <button onClick={handleDownload} style={{ color: 'white' }}>
                      Download
                    </button>
                  </div>
                ) : (
                  <p>Loading image...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );

}