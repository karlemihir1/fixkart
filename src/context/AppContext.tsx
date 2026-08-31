import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  SparePart, 
  Technician, 
  CartItem, 
  RepairOrder, 
  RepairPassport, 
  WarrantyClaim, 
  DiagnosisSession, 
  PinCodeServiceability,
  RepairOrderStatus,
  AdditionalPartRequest
} from '../types';
import { 
  SAMPLE_SPARE_PARTS, 
  VERIFIED_TECHNICIANS, 
  INITIAL_ORDERS, 
  INITIAL_REPAIR_PASSPORTS, 
  PIN_CODES_DATABASE,
  SAMPLE_SCAN_IMAGES,
  SYMPTOMS_BY_DEVICE
} from '../data/mockData';

export type AppView = 
  | 'home' 
  | 'fix' 
  | 'marketplace' 
  | 'technicians' 
  | 'account' 
  | 'technician-portal' 
  | 'supplier-portal' 
  | 'admin-portal';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  
  // PIN Code & Location
  pinCode: string;
  pinData: PinCodeServiceability | null;
  setPinCode: (pin: string) => boolean;
  isPinModalOpen: boolean;
  setIsPinModalOpen: (open: boolean) => void;
  
  // Diagnosis Flow
  diagnosis: DiagnosisSession;
  setDiagnosis: React.Dispatch<React.SetStateAction<DiagnosisSession>>;
  startDiagnosis: (categoryId?: string, deviceId?: string) => void;
  runPhotoScan: (imageUrl: string, customFile?: boolean) => void;
  resetDiagnosis: () => void;
  
  // Catalog & Products
  parts: SparePart[];
  addSupplierPart: (newPart: SparePart) => void;
  selectedProduct: SparePart | null;
  setSelectedProduct: (part: SparePart | null) => void;
  comparisonParts: SparePart[];
  toggleComparison: (part: SparePart) => void;
  clearComparison: () => void;
  isComparisonOpen: boolean;
  setIsComparisonOpen: (open: boolean) => void;
  
  // Technicians
  technicians: Technician[];
  selectedTechnician: Technician | null;
  setSelectedTechnician: (tech: Technician | null) => void;
  
  // Cart & Checkout
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  cartTotal: {
    partsTotal: number;
    laborTotal: number;
    taxes: number;
    discount: number;
    grandTotal: number;
    itemCount: number;
  };
  
  // Orders & Live Repairs
  orders: RepairOrder[];
  activeTrackingOrder: RepairOrder | null;
  setActiveTrackingOrder: (order: RepairOrder | null) => void;
  placeOrder: (orderPayload: Partial<RepairOrder>) => RepairOrder;
  updateOrderStatus: (orderId: string, newStatus: RepairOrderStatus) => void;
  advanceOrderStage: (orderId: string) => void;
  requestAdditionalPart: (orderId: string, part: Omit<AdditionalPartRequest, 'id' | 'requestedAt' | 'status'>) => void;
  handleAdditionalPartResponse: (orderId: string, approved: boolean) => void;
  
  // Repair Passports & Warranties
  passports: RepairPassport[];
  selectedPassport: RepairPassport | null;
  setSelectedPassport: (passport: RepairPassport | null) => void;
  warrantyClaims: WarrantyClaim[];
  submitWarrantyClaim: (claim: Omit<WarrantyClaim, 'id' | 'claimDate' | 'status'>) => void;
  
  // Edge Case Modals
  isDirectMechanicModalOpen: boolean;
  setIsDirectMechanicModalOpen: (open: boolean) => void;
  isExpertModalOpen: boolean;
  setIsExpertModalOpen: (open: boolean) => void;
  isBlurryGuideOpen: boolean;
  setIsBlurryGuideOpen: (open: boolean) => void;
  isUnserviceableModalOpen: boolean;
  setIsUnserviceableModalOpen: (open: boolean) => void;
  
  // Notifications
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const defaultDiagnosis: DiagnosisSession = {
  categoryId: 'home',
  deviceTypeId: 'wm',
  symptomId: null,
  brand: null,
  modelId: null,
  customModelNumber: '',
  uploadedPhotoUrl: null,
  isScanning: false,
  scanStep: 'IDLE',
  confidenceScore: 0,
  detectedProblem: '',
  detectedRootCause: '',
  recommendedParts: []
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [currentView, setCurrentView] = useState<AppView>('home');
  
  // PIN Code state
  const [pinCode, setPinCodeState] = useState<string>('560034');
  const [pinData, setPinData] = useState<PinCodeServiceability | null>(PIN_CODES_DATABASE['560034']);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isUnserviceableModalOpen, setIsUnserviceableModalOpen] = useState(false);
  
  // Diagnosis
  const [diagnosis, setDiagnosis] = useState<DiagnosisSession>(defaultDiagnosis);
  
  // Products & Parts
  const [parts, setParts] = useState<SparePart[]>(SAMPLE_SPARE_PARTS);
  const [selectedProduct, setSelectedProduct] = useState<SparePart | null>(null);
  const [comparisonParts, setComparisonParts] = useState<SparePart[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  
  // Technicians
  const [technicians] = useState<Technician[]>(VERIFIED_TECHNICIANS);
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  
  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Orders & Passports
  const [orders, setOrders] = useState<RepairOrder[]>(INITIAL_ORDERS);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<RepairOrder | null>(INITIAL_ORDERS[0]);
  const [passports, setPassports] = useState<RepairPassport[]>(INITIAL_REPAIR_PASSPORTS);
  const [selectedPassport, setSelectedPassport] = useState<RepairPassport | null>(null);
  const [warrantyClaims, setWarrantyClaims] = useState<WarrantyClaim[]>([]);
  
  // Edge Case Modals
  const [isDirectMechanicModalOpen, setIsDirectMechanicModalOpen] = useState(false);
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);
  const [isBlurryGuideOpen, setIsBlurryGuideOpen] = useState(false);
  
  // Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = 'toast-' + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync role view when switching roles
  useEffect(() => {
    if (role === 'technician' && currentView !== 'technician-portal') {
      setCurrentView('technician-portal');
      addToast('info', 'Switched to Technician Portal', 'Welcome back Raj Kumar. Viewing active jobs & field operations.');
    } else if (role === 'supplier' && currentView !== 'supplier-portal') {
      setCurrentView('supplier-portal');
      addToast('info', 'Switched to Supplier Portal', 'Apex Spares inventory & batch tracking active.');
    } else if (role === 'admin' && currentView !== 'admin-portal') {
      setCurrentView('admin-portal');
      addToast('info', 'Switched to Admin Control Center', 'Real-time FixKart operations command active.');
    } else if (role === 'customer' && ['technician-portal', 'supplier-portal', 'admin-portal'].includes(currentView)) {
      setCurrentView('home');
      addToast('info', 'Switched to Customer View', 'Exploring consumer repair-commerce experience.');
    }
  }, [role]);

  const setPinCode = (pin: string): boolean => {
    setPinCodeState(pin);
    const data = PIN_CODES_DATABASE[pin];
    if (data) {
      setPinData(data);
      if (!data.isServiceable) {
        setIsUnserviceableModalOpen(true);
        addToast('warning', 'Location Unserviceable', `FixKart is not active yet in PIN ${pin}. Join the launch waitlist.`);
        return false;
      } else {
        addToast('success', 'Location Updated', `Active in ${data.city} (${data.state}). 2-hr dispatch available.`);
        return true;
      }
    } else {
      // Dynamic fallback for any standard 6-digit pin
      const fallback: PinCodeServiceability = {
        pin,
        city: 'Metro Hub Area',
        state: 'India',
        isServiceable: true,
        partsDeliveryTime: '3-4 hours Express',
        expressTechnicianETA: '45 mins',
        techniciansAvailable: 8
      };
      setPinData(fallback);
      addToast('success', 'Location Detected', `Serviceable in PIN ${pin}. Local verified technicians ready.`);
      return true;
    }
  };

  const startDiagnosis = (categoryId = 'home', deviceId = 'wm') => {
    setDiagnosis({
      ...defaultDiagnosis,
      categoryId: categoryId as any,
      deviceTypeId: deviceId
    });
    setCurrentView('fix');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetDiagnosis = () => {
    setDiagnosis(defaultDiagnosis);
  };

  const runPhotoScan = (imageUrl: string, customFile = false) => {
    setDiagnosis((prev) => ({
      ...prev,
      uploadedPhotoUrl: imageUrl,
      isScanning: true,
      scanStep: 'SCANNING'
    }));

    // Step 1: Scanning Laser
    setTimeout(() => {
      setDiagnosis((prev) => ({ ...prev, scanStep: 'IDENTIFYING' }));
    }, 1200);

    // Step 2: Cross Reference
    setTimeout(() => {
      setDiagnosis((prev) => ({ ...prev, scanStep: 'CHECKING_COMPATIBILITY' }));
    }, 2400);

    // Step 3: Result
    setTimeout(() => {
      // Check if it's a known sample image or custom file
      const matchedSample = SAMPLE_SCAN_IMAGES.find((s) => s.imageUrl === imageUrl);
      
      if (matchedSample && matchedSample.confidence < 50) {
        // Low confidence edge case
        setDiagnosis((prev) => ({
          ...prev,
          isScanning: false,
          scanStep: 'COMPLETED',
          confidenceScore: matchedSample.confidence,
          detectedProblem: 'Low Optical Clarity / Unrecognized Component',
          detectedRootCause: matchedSample.detectedIssue,
          recommendedParts: []
        }));
        setIsBlurryGuideOpen(true);
      } else {
        const deviceId = matchedSample ? matchedSample.deviceTypeId : (diagnosis.deviceTypeId || 'wm');
        const symptomId = matchedSample ? matchedSample.symptomId : (diagnosis.symptomId || 'wm-drain');
        
        // Find matching parts for this device/issue
        const filteredParts = parts.filter((p) => p.deviceTypeId === deviceId);
        const symptom = SYMPTOMS_BY_DEVICE[deviceId]?.find((s) => s.id === symptomId) || SYMPTOMS_BY_DEVICE['wm'][0];

        setDiagnosis((prev) => ({
          ...prev,
          isScanning: false,
          scanStep: 'COMPLETED',
          deviceTypeId: deviceId,
          symptomId: symptomId,
          confidenceScore: matchedSample ? matchedSample.confidence : 93,
          detectedProblem: symptom.title,
          detectedRootCause: symptom.likelyRootCause,
          recommendedParts: filteredParts.length > 0 ? filteredParts : SAMPLE_SPARE_PARTS.slice(0, 3)
        }));

        addToast('success', 'AI Diagnosis Complete', `Detected ${symptom.likelyRootCause} (93% Match).`);
      }
    }, 3800);
  };

  const addSupplierPart = (newPart: SparePart) => {
    setParts((prev) => [newPart, ...prev]);
    addToast('success', 'New SKU Created', `Successfully listed ${newPart.name} (${newPart.sku}) with OEM batch tracking.`);
  };

  const toggleComparison = (part: SparePart) => {
    setComparisonParts((prev) => {
      const exists = prev.some((p) => p.id === part.id);
      if (exists) {
        return prev.filter((p) => p.id !== part.id);
      } else {
        if (prev.length >= 3) {
          addToast('warning', 'Comparison Limit', 'You can compare up to 3 parts side-by-side.');
          return prev;
        }
        return [...prev, part];
      }
    });
    setIsComparisonOpen(true);
  };

  const clearComparison = () => {
    setComparisonParts([]);
    setIsComparisonOpen(false);
  };

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'id' | 'totalPrice'>) => {
    const id = 'cart-' + Math.random().toString(36).substr(2, 9);
    const totalPrice = (item.partPrice + item.installationPrice) * item.quantity;
    const newItem: CartItem = { ...item, id, totalPrice };
    
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
    addToast('success', 'Added to Repair Cart', `${item.itemType === 'PART_AND_INSTALLATION' ? 'Part + Technician Installation Bundle' : 'Item'} added.`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    addToast('info', 'Cart Updated', 'Item removed from your cart.');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart totals
  const cartTotal = cart.reduce((acc, item) => {
    const partSum = item.partPrice * item.quantity;
    const installSum = item.installationPrice * item.quantity;
    acc.partsTotal += partSum;
    acc.laborTotal += installSum;
    acc.itemCount += item.quantity;
    return acc;
  }, { partsTotal: 0, laborTotal: 0, taxes: 0, discount: 0, grandTotal: 0, itemCount: 0 });

  cartTotal.taxes = Math.round((cartTotal.partsTotal + cartTotal.laborTotal) * 0.18); // 18% GST in India
  cartTotal.discount = cart.length > 0 && cart.some(i => i.itemType === 'PART_AND_INSTALLATION') ? 150 : 0; // Combo discount
  cartTotal.grandTotal = cartTotal.partsTotal + cartTotal.laborTotal + cartTotal.taxes - cartTotal.discount;

  // Place order
  const placeOrder = (orderPayload: Partial<RepairOrder>): RepairOrder => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: RepairOrder = {
      id: `ord-${orderNum}`,
      trackingNumber: `FK-IND-2026-${orderNum}`,
      customerName: orderPayload.customerName || 'Aarav Patel',
      customerPhone: orderPayload.customerPhone || '+91 98200 44123',
      customerAddress: orderPayload.customerAddress || 'Flat 302, Palm Heights, Indiranagar',
      pinCode: orderPayload.pinCode || pinCode,
      productName: orderPayload.productName || 'Samsung EcoBubble Front Load Washing Machine',
      brand: orderPayload.brand || 'Samsung',
      modelNumber: orderPayload.modelNumber || 'WW80J4243MW',
      problemDiagnosed: orderPayload.problemDiagnosed || 'Drain Pump Motor Impeller Seizure',
      status: 'ORDER_PLACED',
      createdAt: 'Just now',
      scheduledTime: orderPayload.scheduledTime || 'Today, 2:00 PM - 3:30 PM',
      part: orderPayload.part || SAMPLE_SPARE_PARTS[0],
      technician: orderPayload.technician || VERIFIED_TECHNICIANS[0],
      totalAmount: orderPayload.totalAmount || cartTotal.grandTotal,
      paymentMethod: orderPayload.paymentMethod || 'UPI',
      paymentStatus: orderPayload.paymentMethod === 'PAY_AFTER_FIX' ? 'PENDING_COMPLETION' : 'PAID',
      otpCode: Math.floor(1000 + Math.random() * 9000).toString(),
      passportId: `FK-PASSPORT-2026-${orderNum}`,
      guaranteeExpiresAt: '29 Nov 2026',
      timelineLogs: [
        { time: 'Just now', title: 'Order & Repair Booked', description: 'Payment verified. Dispatch request sent to closest parts hub.', completed: true },
        { time: 'Pending', title: 'Part Batch Verification', description: 'OEM serial and authenticity barcode scan at warehouse.', completed: false },
        { time: 'Pending', title: 'Technician Assigned', description: 'Routing nearest certified master technician.', completed: false },
        { time: 'Pending', title: 'Repair & 3-Step Testing', description: 'On-site installation and diagnostic validation.', completed: false },
        { time: 'Pending', title: '90-Day Digital Guarantee Active', description: 'Minting verified product repair passport.', completed: false }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    addToast('success', 'Order Confirmed!', `Repair #${newOrder.trackingNumber} placed. Tracking initiated.`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: RepairOrderStatus) => {
    setOrders((prev) => prev.map((ord) => {
      if (ord.id !== orderId) return ord;
      return { ...ord, status: newStatus };
    }));
    
    if (activeTrackingOrder?.id === orderId) {
      setActiveTrackingOrder((prev) => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Simulate order stage advancement
  const advanceOrderStage = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const stages: RepairOrderStatus[] = [
      'ORDER_PLACED',
      'PART_VERIFIED',
      'PART_DISPATCHED',
      'TECHNICIAN_ASSIGNED',
      'TECHNICIAN_ON_THE_WAY',
      'REPAIR_IN_PROGRESS',
      'REPAIR_COMPLETED',
      'GUARANTEE_ACTIVE'
    ];

    const currentIndex = stages.indexOf(order.status);
    if (currentIndex >= 0 && currentIndex < stages.length - 1) {
      const nextStatus = stages[currentIndex + 1];
      updateOrderStatus(orderId, nextStatus);

      // If completed, automatically generate a Repair Passport!
      if (nextStatus === 'GUARANTEE_ACTIVE') {
        const passportNum = `FK-PASSPORT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const newPassport: RepairPassport = {
          id: `pass-${Math.random().toString(36).substr(2, 6)}`,
          passportNumber: passportNum,
          orderId: order.id,
          productName: order.productName,
          brand: order.brand,
          modelNumber: order.modelNumber,
          serialNumber: `SN-${order.brand.toUpperCase()}-2026-${Math.floor(100000 + Math.random() * 900000)}`,
          repairDate: 'Today',
          problemFixed: order.problemDiagnosed,
          partInstalledName: order.part?.name || 'OEM Replacement Core Assembly',
          partTier: order.part?.tier || 'OEM',
          partBatchNumber: order.part?.batchNumber || 'BATCH-2026-GENUINE-881',
          technicianName: order.technician?.name || 'Raj Kumar',
          technicianCertId: 'CERT-FK-TECH-9014',
          totalCost: order.totalAmount,
          warrantyExpiryDate: '29 Nov 2026',
          daysRemaining: 90,
          status: 'ACTIVE',
          beforePhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
          afterPhoto: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
          digitalCertificateHash: `FK-CERT-${passportNum}-VERIFIED-GENUINE`,
          qrPayload: `https://fixkart.in/passport/${passportNum}`
        };

        setPassports((prev) => [newPassport, ...prev]);
        addToast('success', 'Repair Passport Minted!', `90-Day Guarantee activated for ${order.productName}.`);
      } else {
        addToast('info', 'Status Updated', `Order transitioned to ${nextStatus.replace(/_/g, ' ')}.`);
      }
    }
  };

  // Technician requests additional part
  const requestAdditionalPart = (orderId: string, partData: Omit<AdditionalPartRequest, 'id' | 'requestedAt' | 'status'>) => {
    const req: AdditionalPartRequest = {
      ...partData,
      id: 'req-' + Math.random().toString(36).substr(2, 6),
      requestedAt: 'Just now',
      status: 'PENDING_APPROVAL'
    };

    setOrders((prev) => prev.map((ord) => {
      if (ord.id !== orderId) return ord;
      return {
        ...ord,
        status: 'ADDITIONAL_PART_REQUESTED',
        additionalPartRequest: req
      };
    }));

    if (activeTrackingOrder?.id === orderId) {
      setActiveTrackingOrder((prev) => prev ? {
        ...prev,
        status: 'ADDITIONAL_PART_REQUESTED',
        additionalPartRequest: req
      } : null);
    }

    addToast('warning', 'Additional Part Approval Requested', `Technician Raj Kumar requested approval for ${partData.partName} (+₹${partData.price}).`);
  };

  const handleAdditionalPartResponse = (orderId: string, approved: boolean) => {
    setOrders((prev) => prev.map((ord) => {
      if (ord.id !== orderId || !ord.additionalPartRequest) return ord;
      const updatedReq: AdditionalPartRequest = {
        ...ord.additionalPartRequest,
        status: approved ? 'APPROVED' : 'REJECTED'
      };
      return {
        ...ord,
        status: 'REPAIR_IN_PROGRESS',
        totalAmount: approved ? ord.totalAmount + ord.additionalPartRequest.price : ord.totalAmount,
        additionalPartRequest: updatedReq
      };
    }));

    if (activeTrackingOrder?.id === orderId && activeTrackingOrder.additionalPartRequest) {
      setActiveTrackingOrder((prev) => prev ? {
        ...prev,
        status: 'REPAIR_IN_PROGRESS',
        totalAmount: approved ? prev.totalAmount + prev.additionalPartRequest!.price : prev.totalAmount,
        additionalPartRequest: {
          ...prev.additionalPartRequest!,
          status: approved ? 'APPROVED' : 'REJECTED'
        }
      } : null);
    }

    if (approved) {
      addToast('success', 'Additional Part Approved', 'Technician Raj Kumar was notified to proceed with the secondary repair.');
    } else {
      addToast('info', 'Additional Part Declined', 'Technician will proceed with original repair scope only.');
    }
  };

  // Warranty claim
  const submitWarrantyClaim = (claimData: Omit<WarrantyClaim, 'id' | 'claimDate' | 'status'>) => {
    const newClaim: WarrantyClaim = {
      ...claimData,
      id: `claim-${Math.floor(1000 + Math.random() * 9000)}`,
      claimDate: 'Today',
      status: 'UNDER_REVIEW',
      assignedTechName: 'Raj Kumar (Priority Guarantee Dispatch)'
    };

    setWarrantyClaims((prev) => [newClaim, ...prev]);
    addToast('success', 'Warranty Claim Registered', '₹0 Free warranty inspection ticket created. Priority technician assigned.');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentView,
        setCurrentView,
        pinCode,
        pinData,
        setPinCode,
        isPinModalOpen,
        setIsPinModalOpen,
        diagnosis,
        setDiagnosis,
        startDiagnosis,
        runPhotoScan,
        resetDiagnosis,
        parts,
        addSupplierPart,
        selectedProduct,
        setSelectedProduct,
        comparisonParts,
        toggleComparison,
        clearComparison,
        isComparisonOpen,
        setIsComparisonOpen,
        technicians,
        selectedTechnician,
        setSelectedTechnician,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        cartTotal,
        orders,
        activeTrackingOrder,
        setActiveTrackingOrder,
        placeOrder,
        updateOrderStatus,
        advanceOrderStage,
        requestAdditionalPart,
        handleAdditionalPartResponse,
        passports,
        selectedPassport,
        setSelectedPassport,
        warrantyClaims,
        submitWarrantyClaim,
        isDirectMechanicModalOpen,
        setIsDirectMechanicModalOpen,
        isExpertModalOpen,
        setIsExpertModalOpen,
        isBlurryGuideOpen,
        setIsBlurryGuideOpen,
        isUnserviceableModalOpen,
        setIsUnserviceableModalOpen,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
