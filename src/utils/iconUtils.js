import * as LucideIcons from 'lucide-react';

export const getIcon = (iconName) => {
  // Step 0: Handle null/undefined case
  if (!iconName) {
    console.warn('No icon name provided, using FileText as fallback');
    return LucideIcons.FileText;
  }

  // Create a map for common naming variations
  const iconAliases = {
    'dollar': 'DollarSign',
    'dollar-sign': 'DollarSign',
    'receipt': 'Receipt',
    'clipboard-list': 'ClipboardList',
    'clipboard': 'Clipboard',
    'users': 'Users',
    'bar-chart-4': 'BarChart4',
    'bar-chart-2': 'BarChart2',
    'bar-chart': 'BarChart',
    'heart': 'Heart',
    'twitter': 'Twitter',
    'instagram': 'Instagram',
    'facebook': 'Facebook',
    'file-plus': 'FilePlus',
    'user-plus': 'UserPlus',
    'credit-card': 'CreditCard',
    'file-text': 'FileText',
    'trending-up': 'TrendingUp',
    'filter': 'Filter',
    'plus': 'Plus',
    'trash-2': 'Trash2',
    'save': 'Save',
    'printer': 'Printer',
    'send': 'Send',
    'info': 'Info',
    'chevron-right': 'ChevronRight',
    'check-circle': 'CheckCircle'
  };

  // Check if we have a direct alias mapping
  if (iconAliases[iconName]) {
    const aliasName = iconAliases[iconName];
    if (LucideIcons[aliasName]) {
      return LucideIcons[aliasName];
    }
  }

  // Step 1: Try direct match first (if already PascalCase)
  if (LucideIcons[iconName] && typeof LucideIcons[iconName] === 'function') {
    return LucideIcons[iconName];
  }

  // Step 2: Try with first letter capitalized
  const capitalizedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  if (LucideIcons[capitalizedName] && typeof LucideIcons[capitalizedName] === 'function') {
    return LucideIcons[capitalizedName];
  }

  // Step 3: Handle various transformations from kebab-case to PascalCase
  let componentName = '';
  if (iconName.includes('-')) {
    // Handle kebab-case with numbers (bar-chart-2 → BarChart2)
    componentName = iconName
      .split('-')
      .map(part => {
        // If the part is a number, keep it as is
        if (/^\d+$/.test(part)) {
          return part;
        }
        // Otherwise capitalize first letter
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join('');
  } else {
    componentName = capitalizedName;
  }

  // Step 4: Check if we have a valid component after transformation
  if (LucideIcons[componentName] && typeof LucideIcons[componentName] === 'function') {
    return LucideIcons[componentName];
  }

  // Step 5: Try removing spaces and underscores (user_circle → UserCircle)
  const noSpaces = componentName.replace(/[\s_]/g, '');
  if (LucideIcons[noSpaces] && typeof LucideIcons[noSpaces] === 'function') {
    return LucideIcons[noSpaces];
  }

  // Fallback to a more appropriate default icon with helpful warning
  console.warn(`Icon "${iconName}" not found in Lucide (tried "${componentName}", "${capitalizedName}", and "${noSpaces}"). Using FileText as fallback.`);
  return LucideIcons.FileText;
};