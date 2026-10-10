import { translate } from '@docusaurus/Translate';

// Keep homepage messages together so both locales share the same layout.
export function getHomepageContent() {
  return {
    adminGalleryRole: translate({id: "homepage.refresh.adminGalleryRole", message: "carousel"}),
    adminPrevious: translate({id: "homepage.refresh.adminPrevious", message: "Previous Admin screenshot"}),
    adminNext: translate({id: "homepage.refresh.adminNext", message: "Next Admin screenshot"}),
    adminShowSlide: translate({id: "homepage.refresh.adminShowSlide", message: "Show Admin screenshot"}),
    diagramSwitcher: translate({id: "homepage.refresh.diagramSwitcher", message: "Gateway diagrams"}),
    flowTab: translate({id: "homepage.refresh.flowTab", message: "Request flow"}),
    architectureTab: translate({id: "homepage.refresh.architectureTab", message: "Architecture"}),
    showFlow: translate({id: "homepage.refresh.showFlow", message: "Bring the request flow card to the front"}),
    showArchitecture: translate({id: "homepage.refresh.showArchitecture", message: "Bring the architecture card to the front"}),
    architectureTitle: translate({id: "homepage.refresh.architectureTitle", message: "Inside Apache ShenYu"}),
    architectureDescription: translate({id: "homepage.refresh.architectureDescription", message: "Configuration, request processing, and upstream services."}),
    architectureEnlarge: translate({id: "homepage.refresh.architectureEnlarge", message: "View full-size diagram"}),
    architectureAlt: translate({id: "homepage.refresh.architectureAlt", message: "Apache ShenYu architecture: Admin distributes configuration to gateway replicas, which process requests through a plugin chain and forward them to upstream services."}),
    eyebrow: translate({
      id: "homepage.refresh.eyebrow",
      message: "APACHE SHENYU \u00b7 JAVA-NATIVE API GATEWAY"
    }),
    headline: translate({
      id: "homepage.refresh.headline",
      message: "One gateway."
    }),
    headlineAccent: translate({
      id: "homepage.refresh.headlineAccent",
      message: "Every service."
    }),
    intro: translate({
      id: "homepage.refresh.intro",
      message: "Connect, secure, and govern your APIs with an extensible, multi-protocol gateway. Built in Java. Built for your stack."
    }),
    getStarted: translate({
      id: "homepage.refresh.getStarted",
      message: "Get started"
    }),
    github: translate({
      id: "homepage.refresh.github",
      message: "Explore on GitHub"
    }),
    openSource: translate({
      id: "homepage.refresh.openSource",
      message: "Open source. Community driven. Apache 2.0."
    }),
    flowLabel: translate({
      id: "homepage.refresh.flowLabel",
      message: "A simpler path for every request"
    }),
    incoming: translate({
      id: "homepage.refresh.incoming",
      message: "INCOMING REQUESTS"
    }),
    gateway: translate({
      id: "homepage.refresh.gateway",
      message: "UNIFIED API GATEWAY"
    }),
    auth: translate({
      id: "homepage.refresh.auth",
      message: "Authenticate"
    }),
    route: translate({
      id: "homepage.refresh.route",
      message: "Route"
    }),
    observe: translate({
      id: "homepage.refresh.observe",
      message: "Observe"
    }),
    upstream: translate({
      id: "homepage.refresh.upstream",
      message: "YOUR SERVICES"
    }),
    flowNote: translate({
      id: "homepage.refresh.flowNote",
      message: "Many protocols. One place to manage them."
    }),
    featuresEyebrow: translate({
      id: "homepage.refresh.featuresEyebrow",
      message: "BUILT FOR REAL-WORLD APIS"
    }),
    featuresTitle: translate({
      id: "homepage.refresh.featuresTitle",
      message: "Everything your traffic needs."
    }),
    featuresIntro: translate({
      id: "homepage.refresh.featuresIntro",
      message: "From the first request to a growing service ecosystem, keep your gateway flexible and your architecture clear."
    }),
    proxyTitle: translate({
      id: "homepage.refresh.proxyTitle",
      message: "Speak every protocol"
    }),
    proxyBody: translate({
      id: "homepage.refresh.proxyBody",
      message: "Bring HTTP, Dubbo, gRPC, WebSocket, and MQTT services together behind a single gateway."
    }),
    securityTitle: translate({
      id: "homepage.refresh.securityTitle",
      message: "Security at the edge"
    }),
    securityBody: translate({
      id: "homepage.refresh.securityBody",
      message: "Protect your APIs with authentication and security plugins, including JWT, OAuth 2.0, and WAF."
    }),
    governanceTitle: translate({
      id: "homepage.refresh.governanceTitle",
      message: "Stay in control"
    }),
    governanceBody: translate({
      id: "homepage.refresh.governanceBody",
      message: "Shape traffic with rate limiting, circuit breaking, and request transformation as your services evolve."
    }),
    observeTitle: translate({
      id: "homepage.refresh.observeTitle",
      message: "See the whole picture"
    }),
    observeBody: translate({
      id: "homepage.refresh.observeBody",
      message: "Connect tracing, metrics, and logging to understand how requests move through your system."
    }),
    extendTitle: translate({
      id: "homepage.refresh.extendTitle",
      message: "Make it your own"
    }),
    extendBody: translate({
      id: "homepage.refresh.extendBody",
      message: "Compose your gateway with plugins. Extend it with Java and load new capabilities dynamically."
    }),
    deployTitle: translate({
      id: "homepage.refresh.deployTitle",
      message: "Deploy your way"
    }),
    deployBody: translate({
      id: "homepage.refresh.deployBody",
      message: "Run locally, with Docker, or on Kubernetes. Choose the deployment that fits your infrastructure."
    }),
    learnMore: translate({
      id: "homepage.refresh.learnMore",
      message: "Explore the docs"
    }),
    adminEyebrow: translate({
      id: "homepage.refresh.adminEyebrow",
      message: "SHENYU ADMIN"
    }),
    adminTitle: translate({
      id: "homepage.refresh.adminTitle",
      message: "A clear view.\nComplete control."
    }),
    adminBody: translate({
      id: "homepage.refresh.adminBody",
      message: "Manage plugins, selectors, and routing rules from one visual console. Turn gateway configuration into a clear, everyday workflow."
    }),
    adminPoint1: translate({
      id: "homepage.refresh.adminPoint1",
      message: "Visual plugin configuration"
    }),
    adminPoint2: translate({
      id: "homepage.refresh.adminPoint2",
      message: "Fine-grained selectors and rules"
    }),
    adminPoint3: translate({
      id: "homepage.refresh.adminPoint3",
      message: "Dynamic configuration updates"
    }),
    adminLink: translate({
      id: "homepage.refresh.adminLink",
      message: "Meet the console"
    }),
    adminAlt: translate({
      id: "homepage.refresh.adminAlt",
      message: "Apache ShenYu Admin console screenshot"
    }),
    adminCaption: translate({
      id: "homepage.refresh.adminCaption",
      message: "The ShenYu Admin management console"
    }),
    usersEyebrow: translate({
      id: "homepage.refresh.usersEyebrow",
      message: "IN GOOD COMPANY"
    }),
    usersTitle: translate({
      id: "homepage.refresh.usersTitle",
      message: "Part of real production systems."
    }),
    usersLink: translate({
      id: "homepage.refresh.usersLink",
      message: "Meet our users"
    }),
    communityEyebrow: translate({
      id: "homepage.refresh.communityEyebrow",
      message: "OPEN SOURCE, TOGETHER"
    }),
    communityTitle: translate({
      id: "homepage.refresh.communityTitle",
      message: "Your next contribution\nstarts here."
    }),
    communityBody: translate({
      id: "homepage.refresh.communityBody",
      message: "Ask a question, share an idea, or build a plugin. Help shape Apache ShenYu with a community of developers around the world."
    }),
    communityLink: translate({
      id: "homepage.refresh.communityLink",
      message: "Join the community"
    }),
    newsTitle: translate({
      id: "homepage.refresh.newsTitle",
      message: "From the community"
    }),
    newsBody: translate({
      id: "homepage.refresh.newsBody",
      message: "Project news, releases, and community updates."
    }),
    blogTitle: translate({
      id: "homepage.refresh.blogTitle",
      message: "Ideas and engineering"
    }),
    blogBody: translate({
      id: "homepage.refresh.blogBody",
      message: "Technical deep dives and stories from ShenYu users."
    }),
    footerTagline: translate({
      id: "homepage.refresh.footerTagline",
      message: "One gateway. Every service."
    }),
    footerProject: translate({
      id: "homepage.refresh.footerProject",
      message: "Project"
    }),
    footerCommunity: translate({
      id: "homepage.refresh.footerCommunity",
      message: "Community"
    }),
    footerFoundation: translate({
      id: "homepage.refresh.footerFoundation",
      message: "Apache Software Foundation"
    }),
    docs: translate({
      id: "homepage.refresh.docs",
      message: "Documentation"
    }),
    download: translate({
      id: "homepage.refresh.download",
      message: "Download"
    }),
    blog: translate({
      id: "homepage.refresh.blog",
      message: "Blog"
    }),
    contribute: translate({
      id: "homepage.refresh.contribute",
      message: "Contribute"
    }),
    events: translate({
      id: "homepage.refresh.events",
      message: "Events"
    }),
    mailingList: translate({
      id: "homepage.refresh.mailingList",
      message: "Mailing list"
    }),
    foundation: translate({
      id: "homepage.refresh.foundation",
      message: "Foundation"
    }),
    license: translate({
      id: "homepage.refresh.license",
      message: "License"
    }),
    security: translate({
      id: "homepage.refresh.security",
      message: "Security"
    }),
    privacy: translate({
      id: "homepage.refresh.privacy",
      message: "Privacy"
    }),
    sponsor: translate({
      id: "homepage.refresh.sponsor",
      message: "Sponsorship"
    })
  };
}
