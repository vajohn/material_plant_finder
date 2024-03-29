export interface PlantModel {
  latin_name: string;
  common_name?: string;
  family_name: string;
  plant_type: string;
  bloom_time?: string;
  flower_color?: string;
  size_at_maturity?: string;
  climate_appropriate_plants: string;
  suitable_site_conditions?: string;
  water_needs?: string;
  associated_wildlife?: string;
  stormwater_benefit?: string;
  stormwater_int?: string;
  appropriate_location: string;
  suggested_green_connection_routes: string;
  street_tree_list: string;
  additional_characteristices_notes?: string;
  photocredit01: string;
  photocredit02?: string;
  photocredit03?: string;
  photocredit04?: string;
  habitat?: string;
  habitat_int?: string;
  sidewalk_landscaping_plants?: string;
  sidewalk_landscaping_plants_int?: string;
  plant_communities?: string;
  soil_type?: string;
  habitat_value?: string;
  nurseries?: string;
  special_list?: string;
  super60?: string;
  super60_int?: string;
  top20_int?: string;
  sandy_soil?: string;
  sandy_soil_int?: string;
  former_latin_name?: string;
  thrifty150?: string;
  thrifty150_int?: string;
  shady_clay?: string;
  shady_clay_int?: string;
  pruning_needs?: string;
  additional_species_cultivars_varieties?: string;
}

export interface SearchPlant {
  bloom_time: string;
  common_name?: string;
  plant_type?: string;
  flower_color?: string;
  soil_type?: string;
  habitat_value?: string;
}
