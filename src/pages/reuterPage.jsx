import React, { useState, useEffect } from 'react';

export function ReuterPage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('/proxy/reuters')
      .then((response) => response.text())
      .then((data) => setContent(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
