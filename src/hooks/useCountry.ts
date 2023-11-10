import countries from 'world-countries'


export type CountryObjectType = {
  
    name : string 
    region : string 
    latlong : [number , number] 
    flag : string
}

const FormattedcountryObj = countries.map(item => (
  {
    name: item.name.common,
    region: item.region,
    latlong: item.latlng,
    flag: item.flag
  }
)
)

function useCountry() {

  const getDataByName = (countryName: string) => (
    FormattedcountryObj.find(item => item.name === countryName)
  )

  const getAllCountrydata =  FormattedcountryObj

  return { getDataByName, getAllCountrydata }

}

export default useCountry
