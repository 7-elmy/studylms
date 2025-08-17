// // utils/getInitials.js
// export function getInitials(firstName, lastName) {
//   const firstInitial = firstName ? firstName.charAt(0) : '';
//   const lastInitial = lastName ? lastName.charAt(0) : '';
//   return `${firstInitial}${lastInitial}`.toUpperCase();
// }

// utils/getInitials.js
export function getInitials(name) {
  if (!name || typeof name !== 'string') return '';

  // Split the name into parts, removing empty strings
  const nameParts = name.split(' ').filter(part => part.trim() !== '');
  
  // Handle different name formats
  if (nameParts.length === 0) {
    return '';
  } else if (nameParts.length === 1) {
    // Single name: return first character
    return nameParts[0].charAt(0).toUpperCase();
  } else if (nameParts.length === 2) {
    // Two names: return first character of each
    return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
  } else {
    // Three or more names: return first character of first and last names
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
  }
}

// // Alternative version that handles firstName/lastName parameters separately
// export function getInitialsFromParts(firstName = '', lastName = '') {
//   const firstInitial = firstName.trim().charAt(0) || '';
//   const lastInitial = lastName.trim().charAt(0) || '';
//   return `${firstInitial}${lastInitial}`.toUpperCase();
// }