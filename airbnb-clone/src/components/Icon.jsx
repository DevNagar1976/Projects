const iconPaths = {
  search: ['M21 21l-4.35-4.35', 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z'],
  mapPin: ['M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 0 20', 'M12 2a15.3 15.3 0 0 0 0 20'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  user: ['M20 21a8 8 0 0 0-16 0', 'M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
  heart: ['M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z'],
  star: ['M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z'],
  message: ['M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z'],
  filter: ['M4 6h16', 'M7 12h10', 'M10 18h4'],
  sliders: ['M4 6h10', 'M18 6h2', 'M4 12h2', 'M10 12h10', 'M4 18h7', 'M15 18h5', 'M14 4v4', 'M6 10v4', 'M11 16v4'],
  chevronLeft: ['M15 18l-6-6 6-6'],
  chevronRight: ['M9 18l6-6-6-6'],
  x: ['M18 6L6 18', 'M6 6l12 12'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
  home: ['M3 11l9-8 9 8', 'M5 10v10h14V10', 'M9 20v-6h6v6'],
  building: ['M4 21V4h10v17', 'M14 8h6v13', 'M8 8h2', 'M8 12h2', 'M8 16h2', 'M17 12h1', 'M17 16h1'],
  mountain: ['M3 20l6-10 4 6 2-3 6 7z'],
  waves: ['M2 8c3-2 5-2 8 0s5 2 8 0 3-2 4-1', 'M2 13c3-2 5-2 8 0s5 2 8 0 3-2 4-1', 'M2 18c3-2 5-2 8 0s5 2 8 0 3-2 4-1'],
  tree: ['M12 22V10', 'M8 22h8', 'M12 3l-6 9h12z'],
  flame: ['M12 22c4 0 7-3 7-7 0-5-4-7-5-11-1 4-4 5-5 8-1-2-1-4 0-6-3 2-5 5-5 9 0 4 3 7 8 7z'],
  gem: ['M6 3h12l4 6-10 12L2 9z', 'M2 9h20', 'M9 3l3 6 3-6'],
  tent: ['M3 20l9-17 9 17z', 'M12 3v17', 'M8 20l4-7 4 7'],
  umbrella: ['M3 12a9 9 0 0 1 18 0z', 'M12 12v7a2 2 0 0 0 4 0'],
  landmark: ['M3 10h18', 'M5 10v8', 'M9 10v8', 'M15 10v8', 'M19 10v8', 'M3 20h18', 'M12 3l9 5H3z'],
  sprout: ['M12 22V10', 'M12 13c-5 0-7-3-7-7 5 0 7 3 7 7z', 'M12 10c5 0 7-3 7-7-5 0-7 3-7 7z'],
  castle: ['M4 21V8h4V4h4v4h4V4h4v17z', 'M4 12h16', 'M10 21v-5h4v5'],
  palm: ['M12 22v-9', 'M12 13c-3-4-6-5-9-4 3 1 5 3 6 6', 'M12 13c3-4 6-5 9-4-3 1-5 3-6 6', 'M12 10c0-4-1-6-3-8 3 2 4 5 3 8', 'M12 10c0-4 1-6 3-8-3 2-4 5-3 8'],
  facebook: ['M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1z'],
  instagram: ['M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z', 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', 'M17.5 6.5h.01'],
  twitter: ['M22 4.01c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0-7.42 2.94v.96A12.2 12.2 0 0 1 3.3 4.13s-4 9 5 13a13 13 0 0 1-7 2c9 5 20 0 20-11.5 0-.27 0-.53-.02-.79A7.7 7.7 0 0 0 22 4.01z'],
};

export default function Icon({ name, size = 24, strokeWidth = 2, fill = 'none', className = '', ...props }) {
  const paths = iconPaths[name] || iconPaths.home;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths.map((d, index) => <path d={d} key={`${name}-${index}`} />)}
    </svg>
  );
}
