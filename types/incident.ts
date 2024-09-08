export interface FullyIncidentsResponse {
  current_page: number
  data: Incident[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: any
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}

interface Incident {
  id: number
  name: string
  evidence: string
  criticality: number
  host: string
  created_at: string
  updated_at: string
  user_id: number
  deleted_at: any
}

interface Link {
  url?: string
  label: string
  active: boolean
}

export interface RawIncidentsData {
  status: boolean
  incidents: FullyIncidentsResponse
}

export type IncidentFormData = Pick<Incident, 'id' | 'name' | 'evidence' | 'criticality' | 'host' | 'user_id'>

export interface IncidentResponse {
  status: boolean
  message: string
}