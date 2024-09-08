export const criticalityData = [
  {key: 1, value:'Observação'},
  {key: 2, value:'Alerta'},
  {key: 3, value:'Perigoso'},
  {key: 4, value:'Crítico'}
]

export const criticalityValueMapper = criticalityData.reduce((acc, { key, value }) => 
  {
    acc[key] = value;
    return acc;
  }, {} as Record<number, string>);