export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const transformCategory = (categorys: string[]) => {
  const transformedCategory = categorys.map(name => ({
    name: name,
    image: `/category/${name}.png`
  }));
  return transformedCategory;
  
}