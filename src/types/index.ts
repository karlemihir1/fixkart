export type UserRole = 'customer' | 'technician' | 'supplier' | 'admin';

export type CategoryId = 'home' | 'tech' | 'ride';

export interface DeviceCategory {
  id: CategoryId;
  name: string;
  tagline: string;
  iconName: string;
  accentColor: string;
  itemCount: number;
  devices: DeviceType[];
}

export interface DeviceType {
  id: string;
  categoryId: CategoryId;
  name: string;
  popularBrands: string[];
  icon: string;
  avgRepairTime: string;
}

export interface SymptomOption {
  id: string;
  title: string;
  description: string;
  likelyRootCause: string;
  severity: 'high' | 'medium' | 'low';
  estimatedPartCost: string;
  suggestedAction: string;
}

export interface BrandModel {
  brand: string;
  models: {
    id: string;
    modelNumber: string;
    commercialName: string;
    year: string;
    schematicId: string;
  }[];
}

export type PartTier = 'OEM' | 'CERTIFIED' | 'ECONOMY';

export interface SparePart {
  id: string;
  sku: string;
  name: string;
  category: CategoryId;
  deviceTypeId: string;
  brand: string;
  tier: PartTier;
  price: number;
  originalPrice: number;
  compatibilityScore: number; // e.g. 100 for OEM, 98 for Certified, 92 for Economy
  compatibilityType: 'EXACT_MATCH' | 'VERIFIED_COMPATIBLE' | 'NEEDS_CONFIRMATION' | 'INCOMPATIBLE';
  compatibleModelIds: string[]; // List of matching model IDs
  supplier: {
    id: string;
    name: string;
    location: string;
    verified: boolean;
    rating: number;
    ratingCount: number;
    fulfillmentRate: number;
  };
  warrantyDays: number;
  stockCount: number;
  batchNumber: string;
  authenticityHash: string;
  deliveryDays: string;
  installationFee: number;
  rating: number;
  reviewCount: number;
  image: string;
  schematicDiagram?: string;
  specs: Record<string, string>;
  keyFeatures: string[];
  inStock: boolean;
}

export interface Technician {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  repairsCompleted: number;
  firstTimeFixRate: number; // e.g. 98.4%
  distanceKm: number;
  estimatedArrivalMin: number;
  baseLaborFee: number;
  skills: string[];
  verifiedBadge: boolean;
  yearsExperience: number;
  currentLocationName: string;
  availableToday: boolean;
  badges: string[];
}

export type OrderItemType = 'PART_ONLY' | 'INSTALLATION_ONLY' | 'PART_AND_INSTALLATION' | 'DIRECT_MECHANIC_VISIT';

export interface CartItem {
  id: string;
  part?: SparePart;
  technician?: Technician;
  itemType: OrderItemType;
  deviceModelName?: string;
  problemSummary?: string;
  appointmentSlot?: string;
  quantity: number;
  installationPrice: number;
  partPrice: number;
  totalPrice: number;
}

export type RepairOrderStatus = 
  | 'ORDER_PLACED' 
  | 'PART_VERIFIED' 
  | 'PART_DISPATCHED' 
  | 'TECHNICIAN_ASSIGNED' 
  | 'TECHNICIAN_ON_THE_WAY' 
  | 'REPAIR_IN_PROGRESS' 
  | 'ADDITIONAL_PART_REQUESTED'
  | 'REPAIR_COMPLETED' 
  | 'GUARANTEE_ACTIVE';

export interface AdditionalPartRequest {
  id: string;
  partName: string;
  sku: string;
  price: number;
  reason: string;
  requestedAt: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  photoEvidenceUrl?: string;
}

export interface RepairOrder {
  id: string;
  trackingNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  pinCode: string;
  productName: string;
  brand: string;
  modelNumber: string;
  problemDiagnosed: string;
  status: RepairOrderStatus;
  createdAt: string;
  scheduledTime: string;
  part?: SparePart;
  technician?: Technician;
  additionalPartRequest?: AdditionalPartRequest;
  totalAmount: number;
  paymentMethod: 'UPI' | 'CARD' | 'NET_BANKING' | 'PAY_AFTER_FIX';
  paymentStatus: 'PAID' | 'PENDING_COMPLETION';
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
  otpCode: string;
  passportId?: string;
  guaranteeExpiresAt?: string;
  timelineLogs: {
    time: string;
    title: string;
    description: string;
    completed: boolean;
  }[];
}

export interface RepairPassport {
  id: string;
  passportNumber: string;
  orderId: string;
  productName: string;
  brand: string;
  modelNumber: string;
  serialNumber: string;
  repairDate: string;
  problemFixed: string;
  partInstalledName: string;
  partTier: PartTier;
  partBatchNumber: string;
  technicianName: string;
  technicianCertId: string;
  totalCost: number;
  warrantyExpiryDate: string;
  daysRemaining: number;
  status: 'ACTIVE' | 'EXPIRED' | 'CLAIMED';
  beforePhoto: string;
  afterPhoto: string;
  digitalCertificateHash: string;
  qrPayload: string;
}

export interface WarrantyClaim {
  id: string;
  passportId: string;
  orderId: string;
  productName: string;
  claimDate: string;
  problemDescription: string;
  photoUrl?: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'TECH_ASSIGNED' | 'RESOLVED';
  assignedTechName?: string;
  resolutionNote?: string;
}

export interface DiagnosisSession {
  categoryId: CategoryId | null;
  deviceTypeId: string | null;
  symptomId: string | null;
  brand: string | null;
  modelId: string | null;
  customModelNumber: string;
  uploadedPhotoUrl: string | null;
  isScanning: boolean;
  scanStep: 'IDLE' | 'SCANNING' | 'IDENTIFYING' | 'CHECKING_COMPATIBILITY' | 'COMPLETED';
  confidenceScore: number;
  detectedProblem: string;
  detectedRootCause: string;
  recommendedParts: SparePart[];
}

export interface PinCodeServiceability {
  pin: string;
  city: string;
  state: string;
  isServiceable: boolean;
  partsDeliveryTime: string;
  expressTechnicianETA: string;
  techniciansAvailable: number;
}
