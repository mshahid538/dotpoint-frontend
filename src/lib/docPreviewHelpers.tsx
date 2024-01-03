export const converOctateToType = async ({url, type}:any) => {
    const b = await fetch(url).then((d) => d.blob());
    return b.slice(0, b.size, type);
  };