export const getFileIcon = ({ fileName, url, localName }: any) => {
    let fileType = "";
    const possibleFile = fileName
      ? fileName.split(".")
      : localName
      ? /[^\\]*\.(\w+)$/.exec(localName || "")
      : /\/.*\.(.+)?\?/gi.exec(url || "");
  
    if (possibleFile && possibleFile.length == 2) {
      switch (possibleFile[1].toLowerCase()) {
        case "png":
          fileType = "png";
          break;
        case "jpg":
        case "jpeg":
          fileType = "jpg";
          break;
        case "gif":
        case "gif":
          fileType = "gallery";
          break;
        case "doc":
        case "docx":
          fileType = "doc";
          break;
        case "ppt":
        case "pptx":
          fileType = "ppt";
          break;
        case "pdf":
          fileType = "pdf";
          break;
        case "xls":
        case "xlsx":
          fileType = "xls";
          break;
        case "txt":
          fileType = "txt";
          break;
        case "mp4":
          fileType = "video-player";
          break;
        case "mp3":
          fileType = "music";
          break;
        default:
          fileType = "file";
      }
    }
    fileType;
    return fileType;
  };
  