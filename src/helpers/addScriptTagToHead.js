export const addScriptTagToHead = (key, cdnUrl, keyName, keyValue) => {
    const script = document.createElement("script");
    script.type = "text/javascript"
    script.src = key ? `${cdnUrl}?${keyName}=${keyValue}` : cdnUrl
    script.async = false;
    document.head.appendChild(script)
};