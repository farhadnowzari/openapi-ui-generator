import { useEffect, useState } from "react";
import { defaultSettings, Doc, Settings } from "./types";
import "./header.scss";

const ApiHeader = (props: { onCurrentDocChanged: (doc: Doc) => void }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const { onCurrentDocChanged } = props;
  const fetchSettings = async () => {
    const response = await fetch("./docs/settings.json", { cache: 'no-store' });
    if (response.status >= 300) {
      return null;
    }
    return await response.json();
  };

  useEffect(() => {
    fetchSettings().then((_settings) => {
      if (!_settings) {
        settings.docs = [];
        settings.docs.push({
          name: "Default",
          url: "./docs/default.json",
        });
        setSettings(settings);
        onCurrentDocChanged(settings.docs[0]);
      } else {
        setSettings(_settings);
        onCurrentDocChanged(_settings.docs[0]);

      }
    });
  }, []);

  return (
    <nav className={`header header-${settings.dark ? "dark" : "light"}`}>
      {settings.logoUrl && (
        <img src={settings.logoUrl} className="logo" alt="logo" />
      )}
      <h1>{settings.name}</h1>
      {settings.docs.length > 1 && (
        <select
          onChange={(e) => onCurrentDocChanged(settings.docs[e.target.selectedIndex])}
        >
          {settings.docs.map((doc, index) => (
            <option key={index} value={index}>
              {doc.name ?? `API ${index + 1}`}
            </option>
          ))}
        </select>
      )}
    </nav>
  );
};

export { ApiHeader };
