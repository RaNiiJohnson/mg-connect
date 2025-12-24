import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { CommunautePageSkeleton } from "./_component/skeleton";
import { getUser } from "@/lib/auth-server";
import {
  getAllCommunityMembers,
  getAllServiceProviders,
  getMyServiceProvider,
} from "./_actions/community.action";
import { MembersList } from "./_component/list/members-list";
import { ServiceProvidersList } from "./_component/list/service-providers-list";

type CommunauteSearchParams = {
  search?: string;
  status?: string;
  city?: string;
  field?: string;
  role?: string;
  page?: string;
};

async function CommunauteContent({
  searchParams,
}: {
  searchParams: Promise<CommunauteSearchParams>;
}) {
  const user = await getUser();
  const resolvedParams = (await searchParams) || {};
  const page = Number(resolvedParams.page) || 1;
  const limit = 12;

  // Parallel fetching for better performance
  const [membersData, providersData] = await Promise.all([
    getAllCommunityMembers({
      page,
      limit,
      search: resolvedParams.search,
      status: resolvedParams.status,
      city: resolvedParams.city,
      field: resolvedParams.field,
      role: resolvedParams.role,
    }),
    getAllServiceProviders({
      page,
      limit,
      search: resolvedParams.search,
      city: resolvedParams.city,
      serviceType: resolvedParams.field,
    }),
  ]);

  const { members, pagination: membersPagination } = membersData;
  const { currentPage: membersCurrentPage, totalPages: membersTotalPages } =
    membersPagination;

  const { providers, pagination: providersPagination } = providersData;
  const { currentPage: providersCurrentPage, totalPages: providersTotalPages } =
    providersPagination;

  const myProviderProfile = user ? await getMyServiceProvider(user.id) : null;

  return (
    <Tabs defaultValue="members" className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <TabsList>
          <TabsTrigger value="members">Tous les membres</TabsTrigger>
          <TabsTrigger value="providers">Prestataires</TabsTrigger>
          {/* <TabsTrigger value="guides">Infos pratiques</TabsTrigger> */}
        </TabsList>
      </div>

      <TabsContent value="members" className="space-y-6">
        {/* <CommunauteFilters /> */}
        <MembersList
          members={members}
          currentPage={membersCurrentPage}
          totalPages={membersTotalPages}
        />
      </TabsContent>

      <TabsContent value="providers" className="space-y-6">
        {/* <CommunauteFilters /> */}
        <ServiceProvidersList
          providers={providers}
          user={user}
          userProviderProfile={myProviderProfile}
          currentPage={providersCurrentPage}
          totalPages={providersTotalPages}
        />
      </TabsContent>

      {/* <TabsContent value="guides">
        <GuidesTab />
      </TabsContent> */}
    </Tabs>
  );
}

export default function CommunautePage({
  searchParams,
}: {
  searchParams: Promise<CommunauteSearchParams>;
}) {
  return (
    <div className="min-h-screen bg-background pb-12">
      {/* <HeroSection
        title="Communauté"
        subtitle="Connectez-vous avec d'autres Malagasy en Allemagne"
        backgroundImage="/images/community-bg.png"
      /> */}

      <div className="max-w-6xl mx-auto px-4 py-20">
        <Suspense fallback={<CommunautePageSkeleton />}>
          <CommunauteContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
