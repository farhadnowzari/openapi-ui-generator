import { useState } from "react";
import SwaggerUI from "swagger-ui-react";
import type { Doc } from "common";
import { ApiHeader } from "common";

const DocLoader = () => {

  const [currentDoc, setCurrentDoc] = useState<Doc | null>(null);
  return (
    <div>
      <ApiHeader onCurrentDocChanged={(doc) => setCurrentDoc(doc)} />
      {currentDoc && (
        <SwaggerUI
          deepLinking={true}
          url={currentDoc.url}
          tryItOutEnabled={false}
        />
      )}
    </div>
  );
};

export default DocLoader;
