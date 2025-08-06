export { serviceService } from "./api"
export { useService, useServices } from "./model"
export {
  serviceEditSchema as ServiceEditSchema,
  serviceCreateSchema,
  serviceReducedSchema,
  serviceSchema,
  type CommonServiceOptions,
  type Service,
  type ServiceCreate,
  type ServiceEdit,
  type ServiceReduced,
  type ServiceType,
} from "./model/types"
export { ServiceCard, ServicesSelect } from "./ui"
