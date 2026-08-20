export const initialProfile = {
  name: 'Hanjari Prajapati',
  username: 'hp___.18',
  image: '/profile.jpg',
  bio: 'MERN Stack Developer 💻\nReact • Node.js • Express • MongoDB\nBuilding modern web experiences 🚀',
  location: 'Gujarat, India',
  website: 'https://www.instagram.com/hp___.18/?hl=en',
  posts: 9,
  followers: 428,
  following: 312,
}

export const stories = [
  { id: 1, username: 'hp___.18', label: 'Your story', initials: 'HP', image: '/profile.jpg' },
  { id: 2, username: 'react_dev', label: 'React Dev', initials: 'RD' },
  { id: 3, username: 'codewith_raj', label: 'Raj', initials: 'CR' },
  { id: 4, username: 'ui.sneha', label: 'Sneha', initials: 'US' },
  { id: 5, username: 'node_ninja', label: 'Node Ninja', initials: 'NN' },
  { id: 6, username: 'js.daily', label: 'JS Daily', initials: 'JD' },
]

export const initialPosts = [
  {
    id: 1,
    username: 'hp___.18',
    name: 'Hanjari Prajapati',
    initials: 'HP',
    image: '/profile.jpg',
    time: '2h',
    title: 'Building with MERN',
    subtitle: 'React + Node.js + Express + MongoDB',
    caption: 'Working on another full-stack project. Clean UI, strong APIs and better user experience. 🚀 #mern #reactjs #webdevelopment',
    likes: 184,
    liked: false,
  },
  {
    id: 2,
    username: 'react_dev',
    name: 'React Dev',
    initials: 'RD',
    time: '4h',
    title: 'Component thinking',
    subtitle: 'Reusable UI = faster development',
    caption: 'Small reusable components can make a large frontend much easier to maintain. #react #frontend',
    likes: 96,
    liked: false,
  },
  {
    id: 3,
    username: 'codewith_raj',
    name: 'Raj Patel',
    initials: 'CR',
    time: '7h',
    title: 'API Day',
    subtitle: 'Express REST API + MongoDB',
    caption: 'Today: auth middleware, REST APIs and better error handling. #nodejs #express',
    likes: 121,
    liked: false,
  },
]

export const suggestedPeople = [
  { id: 1, username: 'react.with.aman', name: 'Aman • React Developer', initials: 'RA', reason: 'React & frontend development' },
  { id: 2, username: 'mern.raj', name: 'Raj • MERN Developer', initials: 'MR', reason: 'MERN Stack projects' },
  { id: 3, username: 'ui.sneha', name: 'Sneha • UI Developer', initials: 'US', reason: 'UI/UX & React' },
  { id: 4, username: 'node_ninja', name: 'Node Ninja', initials: 'NN', reason: 'Node.js & APIs' },
  { id: 5, username: 'js.daily', name: 'JavaScript Daily', initials: 'JD', reason: 'JavaScript learning' },
]

export const profileGrid = [
  { id: 1, title: 'MERN STACK', subtitle: 'Build • Learn • Ship', emoji: '⚡' },
  { id: 2, title: 'REACT', subtitle: 'Frontend Development', emoji: '⚛️' },
  { id: 3, title: 'NODE.JS', subtitle: 'Backend APIs', emoji: '🟢' },
  { id: 4, title: 'MONGODB', subtitle: 'Database', emoji: '🍃' },
  { id: 5, title: 'PROJECT', subtitle: 'Social Network UI', emoji: '📱' },
  { id: 6, title: 'CODING', subtitle: 'Every day', emoji: '💻' },
  { id: 7, title: 'EXPRESS', subtitle: 'REST APIs', emoji: '🚀' },
  { id: 8, title: 'GITHUB', subtitle: 'Build in public', emoji: '🧑‍💻' },
  { id: 9, title: 'WEB DEV', subtitle: 'Keep learning', emoji: '🌐' },
]
