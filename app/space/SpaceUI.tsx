'use client';
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SpaceUI() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [outputValue, setOutputValue] = useState<string | null>(null);

  const updateOutputValue = async () => {
    if (inputRef.current) {
      try {
        const response = await query({ inputs: inputRef.current.value });
        setOutputValue(JSON.stringify(response));
      } catch (error) {
        console.error('Error querying API:', error);
      }
    }
  };

  async function query(data: { inputs: any }) {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/terhdavid/hun_wnut_modell',
      {
        headers: { Authorization: 'Bearer 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' },
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  }

  return (
    <div className="flex flex-col space-y-10">
      <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
        Try out our AI widget
      </h1>
      <div className="flex-col space-y-10">
        <div className="flex flex-col space-y-3">
          <h2 className="text-white font-bold">Input</h2>
          <Input ref={inputRef} id="input" />
          <Button onClick={updateOutputValue}>Submit</Button>
        </div>
        <div className="flex flex-col space-y-3">
          <h2 className="text-white font-bold">Result</h2>
          <Input value={outputValue ?? ''} readOnly />
        </div>
      </div>
    </div>
  );
}