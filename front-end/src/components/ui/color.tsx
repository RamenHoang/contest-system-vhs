const TableColor = () => {
  const colorPalettes = [
    '#29c9c9',
    '#e48b1f',
    '#ff91b2',
    '#69C0FF',
    '#5340ff',
    '#1890FF',
    '#5ac04c',
    '#ad00b3',
    '#dcb130',
    '#660027',
    // Added colors
    '#FF6347', // Tomato
    '#FFD700', // Gold
    '#40E0D0', // Turquoise
    '#9ACD32', // YellowGreen
    '#4B0082', // Indigo
    '#20B2AA', // LightSeaGreen
    '#9370DB', // MediumPurple
    '#F08080', // LightCoral
    '#4682B4', // SteelBlue
    '#708090', // SlateGray
    '#6A5ACD', // SlateBlue
    '#FF4500', // OrangeRed
    '#DA70D6', // Orchid
    '#98FB98' // PaleGreen
  ];

  return (
    <ul className='flex items-center gap-2 flex-wrap px-1'>
      {colorPalettes.map((color, index) => (
        <li
          key={index}
          className='w-6 h-6 rounded-full shrink-0 cursor-pointer flex items-center justify-center'
          style={{ backgroundColor: color }}
          onClick={() => navigator.clipboard.writeText(color)}
        ></li>
      ))}
    </ul>
  );
};

export default TableColor;
