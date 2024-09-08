interface IconFeaturesReturnValue {
  color: string, 
  icon: 'alert-circle' | 'alert-octagon' | 'alert-triangle' | 'alert-octagon'
}

type IconFeatures = {
  [key: number]: IconFeaturesReturnValue;
};

const iconFeatures: IconFeatures = {
  1: {color: '#ffffff', icon: 'alert-circle'},
  2: {color: '#3498DB', icon: 'alert-octagon'},
  3: {color: '#F4D03F', icon: 'alert-triangle'},
  4: {color: '#E74C3C', icon: 'alert-octagon'},
};

export const getIconFeaturesByCriticality = (criticality: number): IconFeaturesReturnValue => {
  return iconFeatures[criticality] || iconFeatures[1];
};