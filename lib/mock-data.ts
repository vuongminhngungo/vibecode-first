import type { NewsArticle, ConflictRegion } from "./types"

export const mockArticles: NewsArticle[] = [
  {
    id: "1",
    title: "UN Security Council Convenes Emergency Session on Global Security",
    description: "World leaders gather to discuss ongoing conflicts and humanitarian crises affecting multiple regions.",
    content: "The United Nations Security Council held an emergency session today to address escalating tensions in various parts of the world. Representatives from member nations expressed concerns over the humanitarian impact of ongoing conflicts and called for immediate diplomatic solutions. The session concluded with a resolution to increase peacekeeping efforts and provide additional humanitarian aid to affected regions.",
    url: "https://example.com/un-security-council",
    urlToImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=450&fit=crop",
    publishedAt: "2026-03-13T10:30:00Z",
    source: { id: "un-news", name: "UN News" },
    author: "International Desk",
    category: "world"
  },
  {
    id: "2",
    title: "Defense Ministers Meet to Discuss Regional Security Framework",
    description: "NATO defense ministers convene to address emerging threats and strengthen collective defense.",
    content: "NATO defense ministers gathered for a two-day summit to discuss the alliance's response to evolving security challenges. Topics included cybersecurity threats, hybrid warfare tactics, and the modernization of military capabilities. Ministers reaffirmed their commitment to collective defense and agreed on measures to enhance interoperability among allied forces.",
    url: "https://example.com/nato-defense",
    urlToImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop",
    publishedAt: "2026-03-13T09:15:00Z",
    source: { id: "defense-news", name: "Defense News" },
    author: "Military Affairs Editor",
    category: "military"
  },
  {
    id: "3",
    title: "Humanitarian Crisis Deepens as Conflict Enters Third Year",
    description: "Aid organizations report critical shortages as millions face displacement and food insecurity.",
    content: "International humanitarian organizations issued urgent appeals for additional funding as the ongoing conflict continues to devastate civilian populations. The UN estimates that over 10 million people have been displaced, with millions more facing acute food insecurity. Aid workers on the ground describe desperate conditions and call for immediate access to deliver life-saving supplies.",
    url: "https://example.com/humanitarian-crisis",
    urlToImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=450&fit=crop",
    publishedAt: "2026-03-13T08:00:00Z",
    source: { id: "reuters", name: "Reuters" },
    author: "Humanitarian Correspondent",
    category: "conflict"
  },
  {
    id: "4",
    title: "Peace Negotiations Resume After Month-Long Stalemate",
    description: "Diplomatic efforts gain momentum as parties agree to return to the negotiating table.",
    content: "Peace talks have resumed following weeks of intensive diplomatic engagement by international mediators. Both parties have agreed to a temporary ceasefire while negotiations continue. Key issues on the agenda include territorial disputes, prisoner exchanges, and the establishment of humanitarian corridors. Observers remain cautiously optimistic about the prospects for a lasting agreement.",
    url: "https://example.com/peace-negotiations",
    urlToImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=450&fit=crop",
    publishedAt: "2026-03-12T18:45:00Z",
    source: { id: "ap-news", name: "Associated Press" },
    author: "Diplomatic Editor",
    category: "world"
  },
  {
    id: "5",
    title: "Military Exercise Demonstrates New Defense Capabilities",
    description: "Joint military exercises showcase advanced technologies and enhanced coordination among allies.",
    content: "A major joint military exercise concluded successfully, demonstrating significant advances in defense capabilities and multinational coordination. The exercise involved thousands of personnel and featured advanced weapons systems, cyber defense operations, and air defense scenarios. Military officials praised the high level of interoperability achieved and emphasized the importance of continued joint training.",
    url: "https://example.com/military-exercise",
    urlToImage: "https://images.unsplash.com/photo-1580748142105-e5c3c4c2ca96?w=800&h=450&fit=crop",
    publishedAt: "2026-03-12T15:30:00Z",
    source: { id: "jane-defense", name: "Jane's Defence" },
    author: "Defense Analyst",
    category: "military"
  },
  {
    id: "6",
    title: "Border Tensions Escalate Following Diplomatic Row",
    description: "Military buildup reported along disputed border as talks break down between neighboring nations.",
    content: "Tensions along a disputed border have escalated significantly following the collapse of diplomatic negotiations. Satellite imagery shows increased military presence on both sides, raising concerns among international observers. Regional powers have called for restraint and offered to mediate, but both parties remain entrenched in their positions. The international community is monitoring the situation closely.",
    url: "https://example.com/border-tensions",
    urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop",
    publishedAt: "2026-03-12T12:00:00Z",
    source: { id: "bbc-news", name: "BBC News" },
    author: "Regional Correspondent",
    category: "conflict"
  },
  {
    id: "7",
    title: "Cyber Warfare Unit Neutralizes Critical Infrastructure Threat",
    description: "Defense cyber operations successfully defend against sophisticated state-sponsored attack.",
    content: "A military cyber operations unit successfully neutralized a sophisticated cyber attack targeting critical national infrastructure. The attack, attributed to a state-sponsored threat actor, aimed to disrupt power grids and communications systems. Defense officials reported that enhanced monitoring systems detected the intrusion early, allowing rapid response teams to contain the threat before significant damage occurred.",
    url: "https://example.com/cyber-warfare",
    urlToImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop",
    publishedAt: "2026-03-11T20:15:00Z",
    source: { id: "cyber-news", name: "CyberScoop" },
    author: "Cybersecurity Editor",
    category: "military"
  },
  {
    id: "8",
    title: "International Coalition Expands Peacekeeping Mission",
    description: "Additional troops deployed to stabilize conflict zone and protect civilian populations.",
    content: "The international peacekeeping coalition has announced the deployment of additional forces to help stabilize a volatile conflict zone. The expanded mission includes increased humanitarian support and enhanced security for aid workers. Coalition commanders emphasized the importance of protecting civilian populations while creating conditions for a political solution. The deployment represents the largest peacekeeping operation in the region in over a decade.",
    url: "https://example.com/peacekeeping-mission",
    urlToImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=450&fit=crop",
    publishedAt: "2026-03-11T14:00:00Z",
    source: { id: "un-news", name: "UN News" },
    author: "Peacekeeping Bureau",
    category: "world"
  },
  {
    id: "9",
    title: "Arms Control Treaty Negotiations Enter Final Phase",
    description: "Major powers near agreement on new framework to limit strategic weapons proliferation.",
    content: "Negotiators from major world powers have entered the final phase of discussions on a landmark arms control treaty. The proposed agreement would establish new limits on strategic weapons and include verification mechanisms to ensure compliance. Diplomats expressed cautious optimism about reaching a deal, noting that significant progress has been made on previously contentious issues. The treaty would replace the previous agreement that expired last year.",
    url: "https://example.com/arms-control",
    urlToImage: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&h=450&fit=crop",
    publishedAt: "2026-03-10T16:30:00Z",
    source: { id: "reuters", name: "Reuters" },
    author: "Arms Control Correspondent",
    category: "world"
  },
  {
    id: "10",
    title: "Refugee Crisis Prompts Regional Emergency Response",
    description: "Neighboring countries coordinate humanitarian response as displacement numbers surge.",
    content: "A coordinated regional emergency response has been activated as the number of refugees fleeing conflict zones continues to surge. Neighboring countries have opened borders and established temporary shelters to accommodate the influx. International organizations are providing support with food, medical care, and essential supplies. The scale of the displacement has prompted calls for a more comprehensive international response to address root causes of the crisis.",
    url: "https://example.com/refugee-crisis",
    urlToImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=450&fit=crop",
    publishedAt: "2026-03-10T11:45:00Z",
    source: { id: "unhcr", name: "UNHCR" },
    author: "Refugee Affairs Reporter",
    category: "conflict"
  }
]

export const conflictRegions: ConflictRegion[] = [
  { id: "1", name: "Eastern Europe", coordinates: [50.4501, 30.5234], articleCount: 45, severity: "high" },
  { id: "2", name: "Middle East", coordinates: [31.7683, 35.2137], articleCount: 38, severity: "high" },
  { id: "3", name: "Horn of Africa", coordinates: [9.145, 40.4897], articleCount: 22, severity: "medium" },
  { id: "4", name: "Central Africa", coordinates: [6.6111, 20.9394], articleCount: 18, severity: "medium" },
  { id: "5", name: "South Asia", coordinates: [28.3949, 84.124], articleCount: 12, severity: "low" },
  { id: "6", name: "Southeast Asia", coordinates: [16.8661, 96.1951], articleCount: 8, severity: "low" },
]

export function filterArticlesByCategory(articles: NewsArticle[], category: string): NewsArticle[] {
  if (category === "all") return articles
  if (category === "war") {
    return articles.filter(article => 
      article.category === "war" || 
      article.category === "conflict" || 
      article.category === "military"
    )
  }
  return articles.filter(article => article.category === category)
}

export function searchArticles(articles: NewsArticle[], query: string): NewsArticle[] {
  if (!query.trim()) return articles
  const lowerQuery = query.toLowerCase()
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description?.toLowerCase().includes(lowerQuery) ||
    article.content?.toLowerCase().includes(lowerQuery)
  )
}
