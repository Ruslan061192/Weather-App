export const SVGIcon = ({iconName}: {iconName: string}) => {
  return (
    <img src={`/icons/${iconName}.svg`} alt={iconName} />
  );
}