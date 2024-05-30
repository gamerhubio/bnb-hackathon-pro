import React from "react";
import { LandingLayout } from "../../layout";
import {
  GamerHubSection,
  HomeSection,
  ReinventingSection,
  RoadmapSection,
  TeamSection,
  TokenSection,
} from "../../modules";
import { ScrollTop } from "../../components";
import "./styles.css"
import { FeatureSection } from "../../modules/landing/feature";
import { EcosystemSection } from "../../modules/landing/ecosystem";
import { PartnersSection } from "../../modules/landing/partners";

export const LandingPage: React.FC = () => {
  return (
    <LandingLayout>
      <HomeSection />
      <ReinventingSection />
      <GamerHubSection />
      <FeatureSection />
      {/* <StreamingSection /> */}
      {/* <MarketplaceSection /> */}
      {/* <MerchStoreSection /> */}
      <EcosystemSection />
      <TokenSection />
      <RoadmapSection />
      <PartnersSection />
      <TeamSection />
      <ScrollTop />
    </LandingLayout>
  );
};
