// API utility functions for client-side data fetching

export interface Member {
  id: string;
  name: string | null;
  photo: string | null;
  bio: string | null;
  city: string | null;
  arrivalDate: string | null;
  status: string | null;
  field: string | null;
  company: string | null;
  journey: string[] | null;
}

export interface JobOffer {
  id: string;
  title: string;
  type: string;
  contractType: string;
  city: string;
  duration: string;
  startDate: string;
  company: string;
  description: string;
  certificates: string[];
  salary: string;
  contact: string;
  author: {
    id: string;
    name: string | null;
    photo: string | null;
  };
}

export interface RealEstateListing {
  id: string;
  title: string;
  type: string;
  city: string;
  district: string;
  price: number;
  deposit: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor: string;
  pets: boolean;
  photos: string[];
  description: string;
  extras: string[];
  contact: string;
  available: string;
  author: {
    id: string;
    name: string | null;
    photo: string | null;
  };
}

// Community API
export async function fetchCommunityMembers(): Promise<Member[]> {
  const response = await fetch("/api/community");
  if (!response.ok) {
    throw new Error("Failed to fetch community members");
  }
  return response.json();
}

// Jobs API
export async function fetchJobOffers(): Promise<JobOffer[]> {
  const response = await fetch("/api/jobs");
  if (!response.ok) {
    throw new Error("Failed to fetch job offers");
  }
  return response.json();
}

export async function createJobOffer(
  data: Omit<JobOffer, "id" | "author">
): Promise<JobOffer> {
  const response = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create job offer");
  }
  return response.json();
}

// Real Estate API
export async function fetchRealEstateListings(): Promise<RealEstateListing[]> {
  const response = await fetch("/api/real-estate");
  if (!response.ok) {
    throw new Error("Failed to fetch real estate listings");
  }
  return response.json();
}

export async function createRealEstateListing(
  data: Omit<RealEstateListing, "id" | "author">
): Promise<RealEstateListing> {
  const response = await fetch("/api/real-estate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create real estate listing");
  }
  return response.json();
}

// Profile API
export async function fetchUserProfile(): Promise<Member> {
  const response = await fetch("/api/profile");
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return response.json();
}

export async function updateUserProfile(
  data: Partial<Member>
): Promise<Member> {
  const response = await fetch("/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }
  return response.json();
}
