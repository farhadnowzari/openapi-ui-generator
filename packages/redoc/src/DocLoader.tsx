import { useState } from "react";
import { RedocStandalone } from 'redoc';
import type { Doc } from "common";
import { ApiHeader } from "common";

const DocLoader = () => {

  const [currentDoc, setCurrentDoc] = useState<Doc | null>(null);
  return (
    <div>
      <ApiHeader onCurrentDocChanged={(doc) => setCurrentDoc(doc)} />
      {currentDoc && (
        <RedocStandalone specUrl={currentDoc.url} />
      )}
    </div>
  );
};

export default DocLoader;
