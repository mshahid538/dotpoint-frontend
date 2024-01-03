export const downloadFile = (filePath: any, fileName: any) => {

    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.target = '_blank'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const downloadFileNewTab = (filePath: any) => {
    window.open(filePath, '_blank');
};