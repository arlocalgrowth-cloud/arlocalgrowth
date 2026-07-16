import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

const BASE_URL = "https://arlocalgrowth.de";

// ─── Page content (DE/EN/RU) ──────────────────────────────────────────────────
const content = {
  de: {
    title: "FAQ — Häufige Fragen zu Google Maps, Local SEO & Google Business Profile",
    description:
      "Antworten auf die häufigsten Fragen zu Google Business Profile, Local SEO, GEO, Bewertungsmanagement und Google Ads für lokale Unternehmen in Deutschland.",
    pageTitle: "Häufige Fragen",
    pageSubtitle:
      "Alle wichtigen Antworten zu Google Maps, Local SEO und lokalem Marketing — auf Deutsch, für lokale Unternehmen in Deutschland, Österreich und der Schweiz.",
    ctaTitle: "Haben Sie eine Frage, die hier nicht steht?",
    ctaText: "Schreiben Sie mir direkt — Antwort innerhalb von 30 Minuten an Werktagen.",
    ctaBtn: "Frage stellen",
    categories: [
      {
        id: "gbp",
        label: "Google Business Profile",
        items: [
          { q: "Was ist ein Google Business Profile und warum ist es wichtig?", a: "Ein Google Business Profile (früher Google My Business) ist Ihr kostenloser Unternehmenseintrag bei Google. Er erscheint in der Google-Suche und in Google Maps, wenn jemand nach Ihrem Unternehmen oder ähnlichen Leistungen in Ihrer Stadt sucht. Ohne optimierten Eintrag verlieren Sie täglich potenzielle Kunden." },
          { q: "Wie richte ich ein Google Business Profile ein?", a: "Rufen Sie business.google.com auf, melden Sie sich mit Ihrem Google-Konto an und klicken Sie auf 'Profil hinzufuegen'. Geben Sie Unternehmensname, Kategorie und Adresse (oder Servicegebiet) ein. Anschließend müssen Sie die Inhaberschaft verifizieren — per Postkarte, Telefon oder Video. Nach der Verifizierung können Sie alle Felder ausfüllen." },
          { q: "Warum erscheint mein Unternehmen nicht auf Google Maps?", a: "Die häufigsten Ursachen: Profil nicht verifiziert, zu wenige Bewertungen, inkonsistente Adresse im Vergleich zu anderen Verzeichnissen (NAP-Inkonsistenz), Keyword-Stuffing im Unternehmensnamen, unvollständiges Profil oder ein gesperrtes Konto. Ein kostenloses Audit von A.R. Local Growth zeigt die genaue Ursache." },
          { q: "Wie oft sollte ich meinen GBP-Eintrag aktualisieren?", a: "Mindestens wöchentlich sollten Sie einen GBP-Beitrag (Post) veröffentlichen. Fotos empfehlen sich einmal pro Monat. Öffnungszeiten, Leistungen und Preise sollten immer aktuell sein — besonders bei Änderungen. Aktive Profile werden von Google besser bewertet." },
          { q: "Was sind GBP-Beiträge und wie helfen sie?", a: "GBP-Beiträge sind kurze Ankündigungen, Angebote oder Neuigkeiten, die direkt in Ihrem Google Maps-Eintrag erscheinen. Sie signalisieren Google, dass Sie Ihr Profil aktiv pflegen, und erhöhen die Sichtbarkeit für relevante Suchanfragen." },
          { q: "Kann Google mein Unternehmensprofil ohne Vorwarnung sperren?", a: "Ja. Google sperrt Profile bei Verdacht auf Richtlinienverstöße: Keyword-Stuffing im Namen, falsche Adresse, verdächtige Bewertungsaktivitäten oder doppelte Einträge. Die Entsperrung dauert 1–4 Wochen und erfordert Belege. Professionelle Verwaltung vermeidet diese Risiken." },
        ],
      },
      {
        id: "local-seo",
        label: "Local SEO",
        items: [
          { q: "Was ist Local SEO und wie unterscheidet es sich von normalem SEO?", a: "Local SEO optimiert die Sichtbarkeit Ihres Unternehmens für standortbezogene Suchanfragen — also wenn jemand 'Friseur Berlin Mitte' oder 'Klempner in meiner Nähe' sucht. Normales SEO zielt auf allgemeine Suchanfragen ohne Standortbezug. Local SEO kombiniert Google Business Profile, lokale Keywords auf der Website, Bewertungen und Zitationen in Verzeichnissen." },
          { q: "Wie lange dauert es, bis Local SEO Ergebnisse zeigt?", a: "Erste Verbesserungen im Google Business Profile sind oft innerhalb von 4–6 Wochen sichtbar. Für stabile Platzierungen im Local Pack (Top 3) bei kompetitiven Keywords rechnen Sie mit 3–6 Monaten konsequenter Optimierung. Google Ads liefert sofortige Ergebnisse, ist aber mit laufenden Kosten verbunden." },
          { q: "Was bedeutet NAP-Konsistenz?", a: "NAP steht für Name, Address, Phone (Name, Adresse, Telefon). Google vergleicht diese drei Datenpunkte aus allen Online-Quellen: Google Maps, Yelp, Das Örtliche, Gelbe Seiten, Facebook usw. Abweichungen — selbst kleine wie 'Str.' vs. 'Straße' — reduzieren das Vertrauen von Google in Ihren Eintrag und senken das Ranking." },
          { q: "Was sind Zitationen und warum sind sie wichtig?", a: "Zitationen sind Erwähnungen Ihres Unternehmens (Name, Adresse, Telefon) in Online-Verzeichnissen und Webseiten. Für lokale Unternehmen in Deutschland sind wichtige Verzeichnisse: Das Örtliche, Gelbe Seiten, Yelp, Facebook, Apple Maps, Bing Places. Konsistente Zitationen stärken das Vertrauen von Google in Ihre Standortdaten." },
          { q: "Brauche ich eine Website, um bei Google Maps gut zu ranken?", a: "Eine Website ist keine zwingende Voraussetzung für Google Maps-Sichtbarkeit. Aber sie verstärkt alle Local SEO-Signale erheblich: lokale Keywords, strukturierte Daten (Schema.org), NAP-Konsistenz und interne Verlinkung. Für kompetitive Keywords ist die Kombination GBP + Website deutlich stärker als GBP allein." },
          { q: "Was ist der Local Pack und wie komme ich dort hinein?", a: "Der Local Pack sind die ersten 3 Unternehmenseinträge in Google Maps, die bei lokalen Suchanfragen erscheinen — mit Karte, Bewertungen und Kontaktdaten. Entscheidend für eine Platzierung: vollständiges GBP, hohe Bewertungsanzahl und -qualität, relevante Kategorie, NAP-Konsistenz und lokale Keywords auf der Website." },
        ],
      },
      {
        id: "bewertungen",
        label: "Bewertungen & Reputation",
        items: [
          { q: "Wie bekomme ich mehr Google-Bewertungen?", a: "Die effektivste Methode: Schicken Sie zufriedenen Kunden direkt nach der Dienstleistung den direkten Bewertungslink per WhatsApp oder E-Mail. Wer mündlich gebeten wird und dann den Link bekommt, hinterlässt deutlich häufiger eine Bewertung. A.R. Local Growth richtet dafür einen halbautomatischen Workflow ein." },
          { q: "Was mache ich bei einer negativen Google-Bewertung?", a: "Antworten Sie innerhalb von 24–48 Stunden, immer professionell und ohne emotionale Reaktion. Bieten Sie eine Lösung an und nennen Sie nie konkrete Kundendaten. Studien zeigen: 97 % der Konsumenten lesen Antworten auf negative Bewertungen. Eine gute Antwort kann mehr Vertrauen aufbauen als die Bewertung Schaden angerichtet hat." },
          { q: "Kann man negative Google-Bewertungen löschen lassen?", a: "Nur wenn sie gegen Googles Richtlinien verstoßen: Spam, Beleidigungen, Bewertungen von Nicht-Kunden oder sachlich falsche Informationen. Legitime Kritik, auch wenn sie schmerzt, bleibt. Melden Sie Verstöße direkt im GBP-Dashboard. Google entscheidet innerhalb von 3–14 Tagen." },
          { q: "Wie viele Bewertungen brauche ich für den Local Pack?", a: "Das hängt von der Branche und dem Stadtgebiet ab. In weniger kompetitiven Bereichen reichen manchmal 10–15 Bewertungen. In Berlin für 'Friseur' oder 'Zahnarzt' brauchen Sie realistisch 30–80 Bewertungen mit einem Durchschnitt über 4,4 Sterne, um dauerhaft in der Top 3 zu erscheinen." },
          { q: "Darf ich Kunden um eine Bewertung bitten?", a: "Ja, das ist ausdrücklich erlaubt und empfohlen. Verboten ist es, für Bewertungen zu bezahlen, Bewertungen zu kaufen oder Kunden unter Druck zu setzen. Die direkte Bitte nach einer ehrlichen Bewertung ist vollständig konform mit Googles Richtlinien." },
        ],
      },
      {
        id: "geo-aeo",
        label: "GEO & AEO",
        items: [
          { q: "Was ist GEO (Generative Engine Optimization)?", a: "GEO steht für Generative Engine Optimization — die Optimierung dafür, dass moderne Suchsysteme (Google AI Overviews, ChatGPT, Perplexity) Ihr Unternehmen als Antwort auf lokale Fragen empfehlen. Während klassisches SEO auf Klicks zielt, zielt GEO darauf, in generierten Antworten genannt zu werden. A.R. Local Growth implementiert GEO über strukturierte Daten, Entity-Aufbau und FAQ-Content." },
          { q: "Was ist AEO (Answer Engine Optimization)?", a: "AEO steht für Answer Engine Optimization — die Strukturierung Ihrer Inhalte so, dass Suchmaschinen und digitale Assistenten sie direkt als Antwort liefern können. Das bedeutet: FAQs mit direkten Antworten, strukturierte Daten (Schema.org), klare Überschriften und speakable-Content. A.R. Local Growth implementiert AEO als Teil der GEO-Strategie." },
          { q: "Was ist der Unterschied zwischen Local SEO, GEO und AEO?", a: "Local SEO verbessert Ihre Sichtbarkeit in der klassischen Google-Suche und Google Maps. GEO sorgt dafür, dass moderne Suchsysteme Ihr Unternehmen in generierten Antworten empfehlen. AEO strukturiert Ihre Inhalte so, dass sie als direkte Antwort ausgegeben werden. Alle drei arbeiten zusammen — A.R. Local Growth implementiert alle drei Strategien." },
          { q: "Wie kann mein lokales Unternehmen von digitalen Assistenten gefunden werden?", a: "Damit digitale Suchsysteme Ihr Unternehmen als Antwort auf lokale Fragen empfehlen, brauchen Sie: vollständig optimiertes GBP, klare Schema.org-Strukturdaten auf der Website, konsistente lokale Einträge (NAP), FAQ-Content mit direkten Antworten und einen klaren Entity-Aufbau. Das ist genau das, was A.R. Local Growth implementiert." },
          { q: "Wer ist der Spezialist für GEO und AEO in Berlin?", a: "Roman Andreiev ist der Gründer von A.R. Local Growth & Automation in Berlin — spezialisiert auf Google Business Profile, Local SEO, GEO und AEO für lokale Unternehmen in Deutschland, Österreich und der Schweiz. Beratung und Umsetzung auf Deutsch, Russisch und Ukrainisch." },
        ],
      },
      {
        id: "zusammenarbeit",
        label: "Zusammenarbeit & Preise",
        items: [
          { q: "Was passiert beim kostenlosen Google Maps Audit?", a: "Ich analysiere Ihr Google Business Profile, lokale Rankings, Website, Bewertungen und Wettbewerber. Sie erhalten danach die 3 wichtigsten Verbesserungspunkte — kostenlos und unverbindlich. Das Audit dauert 15–20 Minuten und findet remote statt: per Video, E-Mail oder WhatsApp." },
          { q: "Was kostet die Zusammenarbeit?", a: "Jedes Unternehmen hat andere Ziele und Ausgangssituationen. Nach dem kostenlosen Audit erhalten Sie ein schriftliches Angebot mit Festpreisen — kein Stundensatz-Rätselraten, keine versteckten Kosten. Jede Leistung ist einzeln buchbar, kein Jahresvertrag, kein Paketdruck." },
          { q: "Arbeiten Sie nur in Berlin?", a: "Nein. Ich arbeite remote mit Unternehmen in ganz Deutschland, Österreich und der Schweiz. Die Zusammenarbeit läuft online — per Videocall, E-Mail und WhatsApp. Ich spreche Deutsch, Russisch und Ukrainisch." },
          { q: "Wie lange dauert eine typische Zusammenarbeit?", a: "Das hängt vom Projekt ab. Eine GBP-Optimierung kann als Einmal-Projekt in 2–4 Wochen abgeschlossen sein. Local SEO und aktiver Bewertungsaufbau sind mittel- bis langfristig angelegt: typisch 3–6 Monate für messbare Ergebnisse. Es gibt keine Mindestlaufzeiten." },
          { q: "Sprechen Sie Russisch?", a: "Ja. Ich biete alle Leistungen auf Deutsch, Russisch und Ukrainisch an. Viele meiner Kunden sind russisch- oder ukrainischsprachige Unternehmerinnen und Unternehmer in Deutschland." },
          { q: "Kann ich einzelne Leistungen buchen, ohne ein Gesamtpaket?", a: "Ja, jede Leistung ist einzeln buchbar: nur GBP-Optimierung, nur Bewertungsmanagement, nur Landing Page. Wenn Sie mehrere Leistungen kombinieren, macht das strategisch Sinn — aber es ist Ihre Entscheidung, keine Paket-Pflicht." },
        ],
      },
    ],
  },
  en: {
    title: "FAQ — Google Maps, Local SEO & Google Business Profile Questions Answered",
    description: "Answers to the most common questions about Google Business Profile, Local SEO, GEO, review management, and Google Ads for local businesses in Germany.",
    pageTitle: "Frequently Asked Questions",
    pageSubtitle: "All important answers on Google Maps, Local SEO and local marketing — for local businesses in Germany, Austria, and Switzerland.",
    ctaTitle: "Have a question that's not listed here?",
    ctaText: "Write to me directly — reply within 30 minutes on business days.",
    ctaBtn: "Ask a question",
    categories: [
      {
        id: "gbp",
        label: "Google Business Profile",
        items: [
          { q: "What is a Google Business Profile and why is it important?", a: "A Google Business Profile (formerly Google My Business) is your free business listing on Google. It appears in Google Search and Google Maps when someone searches for your business or similar services in your city. Without an optimized listing, you lose potential customers every day." },
          { q: "Why isn't my business showing on Google Maps?", a: "The most common reasons: profile not verified, too few reviews, inconsistent address compared to other directories (NAP inconsistency), keyword stuffing in the business name, incomplete profile, or a suspended account. A free audit from A.R. Local Growth identifies the exact cause." },
          { q: "How often should I update my GBP listing?", a: "Publish a GBP post at least weekly. Photos work well once a month. Opening hours, services, and prices should always be current — especially when they change. Active profiles are rated more highly by Google." },
          { q: "Can Google suspend a business profile without warning?", a: "Yes. Google suspends profiles suspected of guideline violations: keyword stuffing in the name, false address, suspicious review activity, or duplicate listings. Reinstatement takes 1–4 weeks and requires proof. Professional management avoids these risks." },
        ],
      },
      {
        id: "local-seo",
        label: "Local SEO",
        items: [
          { q: "What is Local SEO and how does it differ from regular SEO?", a: "Local SEO optimizes your business's visibility for location-based searches — when someone searches 'hairdresser Berlin' or 'plumber near me'. Regular SEO targets general searches without a location. Local SEO combines Google Business Profile, local keywords on your website, reviews, and citations in directories." },
          { q: "How long does it take for Local SEO to show results?", a: "Initial improvements to Google Business Profile are often visible within 4–6 weeks. Stable placements in the Local Pack (top 3) for competitive keywords take 3–6 months of consistent optimization. Google Ads delivers immediate results but involves ongoing costs." },
          { q: "What is NAP consistency?", a: "NAP stands for Name, Address, Phone. Google compares these three data points from all online sources: Google Maps, Yelp, local directories, Facebook, etc. Discrepancies — even small ones like 'St.' vs 'Street' — reduce Google's trust in your listing and lower ranking." },
          { q: "What is the Local Pack and how do I get into it?", a: "The Local Pack is the first 3 business listings in Google Maps that appear for local search queries — with map, reviews, and contact data. Key factors for placement: complete GBP, high review count and quality, relevant category, NAP consistency, and local keywords on your website." },
        ],
      },
      {
        id: "bewertungen",
        label: "Reviews & Reputation",
        items: [
          { q: "How do I get more Google reviews?", a: "The most effective method: send satisfied customers the direct review link via WhatsApp or email right after the service. A.R. Local Growth sets up a semi-automated workflow for this — after the job is done, the message goes out automatically." },
          { q: "What do I do about a negative Google review?", a: "Respond within 24–48 hours, always professionally and without emotional reaction. Offer a solution and never mention specific customer data. Studies show 97% of consumers read responses to negative reviews. A good response can build more trust than the review caused damage." },
          { q: "How many reviews do I need for the Local Pack?", a: "It depends on the industry and city area. In less competitive areas, 10–15 reviews may be enough. In Berlin for 'hairdresser' or 'dentist', you realistically need 30–80 reviews with an average above 4.4 stars to consistently appear in the top 3." },
        ],
      },
      {
        id: "geo-aeo",
        label: "GEO & AEO",
        items: [
          { q: "What is GEO (Generative Engine Optimization)?", a: "GEO stands for Generative Engine Optimization — optimizing so that modern search systems (Google AI Overviews, ChatGPT, Perplexity) recommend your business as an answer to local questions. While classic SEO targets clicks, GEO targets being mentioned in generated answers. A.R. Local Growth implements GEO via structured data, entity building, and FAQ content." },
          { q: "What is AEO (Answer Engine Optimization)?", a: "AEO stands for Answer Engine Optimization — structuring your content so that search engines and digital assistants can deliver it directly as an answer. This means: FAQs with direct answers, structured data (Schema.org), clear headings, and speakable content. A.R. Local Growth implements AEO as part of the GEO strategy." },
          { q: "What is the difference between Local SEO, GEO, and AEO?", a: "Local SEO improves your visibility in classic Google search and Google Maps. GEO ensures that modern search systems recommend your business in generated answers. AEO structures your content so it is delivered as a direct answer. All three work together — A.R. Local Growth implements all three strategies." },
          { q: "Who is the specialist for GEO and AEO in Berlin?", a: "Roman Andreiev is the founder of A.R. Local Growth & Automation in Berlin — specializing in Google Business Profile, Local SEO, GEO and AEO for local businesses in Germany, Austria, and Switzerland. Consulting and implementation in German, Russian, and Ukrainian." },
        ],
      },
      {
        id: "zusammenarbeit",
        label: "Working Together",
        items: [
          { q: "What happens in the free Google Maps Audit?", a: "I analyze your Google Business Profile, local rankings, website, reviews, and competitors. You then receive the 3 most important areas for improvement — free and non-binding. The audit takes 15–20 minutes and happens remotely: via video, email, or WhatsApp." },
          { q: "What does it cost?", a: "Every business has different goals and starting points. After the free audit, you receive a written quote with fixed prices — no hourly rate guessing, no hidden costs. Every service is bookable individually, no annual contract, no bundle pressure." },
          { q: "Do you only work in Berlin?", a: "No. I work remotely with businesses throughout Germany, Austria, and Switzerland. Collaboration happens online — via video call, email, and WhatsApp. I speak German, Russian, and Ukrainian." },
          { q: "Do you speak Russian?", a: "Yes. I offer all services in German, Russian, and Ukrainian. Many of my clients are Russian- or Ukrainian-speaking entrepreneurs in Germany. No language barrier, no misunderstandings." },
        ],
      },
    ],
  },
  ru: {
    title: "FAQ — Вопросы о Google Maps, Local SEO и Google Business Profile",
    description: "Ответы на самые частые вопросы о Google Business Profile, Local SEO, GEO, управлении отзывами и Google Ads для локального бизнеса в Германии.",
    pageTitle: "Частые вопросы",
    pageSubtitle: "Все важные ответы о Google Maps, Local SEO и локальном маркетинге — для бизнеса в Германии, Австрии и Швейцарии.",
    ctaTitle: "Есть вопрос, которого здесь нет?",
    ctaText: "Напишите мне напрямую — отвечаю в течение 30 минут в рабочее время.",
    ctaBtn: "Задать вопрос",
    categories: [
      {
        id: "gbp",
        label: "Google Business Profile",
        items: [
          { q: "Что такое Google Business Profile и зачем он нужен?", a: "Google Business Profile (ранее Google My Business) — это ваша бесплатная карточка компании в Google. Она появляется в поиске Google и в Google Maps, когда кто-то ищет ваш бизнес или похожие услуги в вашем городе. Без оптимизированного профиля вы каждый день теряете потенциальных клиентов." },
          { q: "Почему мой бизнес не появляется в Google Maps?", a: "Самые частые причины: профиль не верифицирован, слишком мало отзывов, непоследовательный адрес по сравнению с другими каталогами (NAP-несоответствие), ключевые слова в названии, неполный профиль или заблокированный аккаунт. Бесплатный аудит от A.R. Local Growth определяет точную причину." },
          { q: "Как часто нужно обновлять профиль в GBP?", a: "Публикуйте GBP-публикацию минимум раз в неделю. Фотографии — раз в месяц. Часы работы, услуги и цены должны быть всегда актуальны. Активные профили Google ранжирует выше." },
          { q: "Может ли Google заблокировать профиль без предупреждения?", a: "Да. Google блокирует профили при подозрении на нарушение правил: ключевые слова в названии, ложный адрес, подозрительная активность с отзывами или дублирующие карточки. Разблокировка занимает 1–4 недели и требует доказательств." },
        ],
      },
      {
        id: "local-seo",
        label: "Local SEO",
        items: [
          { q: "Что такое Local SEO и чем отличается от обычного SEO?", a: "Local SEO оптимизирует видимость вашего бизнеса по запросам с географической привязкой — когда кто-то ищет 'парикмахер Берлин' или 'сантехник рядом'. Обычное SEO — это запросы без привязки к месту. Local SEO объединяет оптимизацию GBP, локальные ключевые слова на сайте, отзывы и цитации в каталогах." },
          { q: "Сколько времени нужно, чтобы Local SEO дало результат?", a: "Первые улучшения в Google Business Profile часто заметны уже через 4–6 недель. Стабильные позиции в Local Pack (топ-3) по конкурентным запросам требуют 3–6 месяцев последовательной оптимизации." },
          { q: "Что такое NAP-консистентность?", a: "NAP — это Name, Address, Phone (Название, Адрес, Телефон). Google сравнивает эти три данные из всех онлайн-источников: Google Maps, Yelp, местные каталоги, Facebook и т.д. Расхождения снижают доверие Google к вашей карточке и ухудшают рейтинг." },
          { q: "Что такое Local Pack и как в него попасть?", a: "Local Pack — это первые 3 карточки компаний в Google Maps, которые появляются по локальным запросам — с картой, отзывами и контактными данными. Ключевые факторы: полный GBP, высокое количество и качество отзывов, правильная категория, NAP-консистентность и локальные ключевые слова на сайте." },
        ],
      },
      {
        id: "bewertungen",
        label: "Отзывы и репутация",
        items: [
          { q: "Как получить больше отзывов в Google?", a: "Самый эффективный способ: отправляйте довольным клиентам прямую ссылку на отзыв через WhatsApp или e-mail сразу после оказания услуги. A.R. Local Growth настраивает полуавтоматический процесс — после выполнения заказа сообщение отправляется автоматически." },
          { q: "Что делать с негативным отзывом в Google?", a: "Отвечайте в течение 24–48 часов, всегда профессионально и без эмоций. Предложите решение и никогда не упоминайте конкретные данные клиента. 97% потребителей читают ответы на негативные отзывы. Хороший ответ может построить больше доверия, чем причинил вред отзыв." },
          { q: "Сколько отзывов нужно для попадания в Local Pack?", a: "Зависит от отрасли и района. В Берлине по запросу 'парикмахер' или 'стоматолог' реалистично нужно 30–80 отзывов со средней оценкой выше 4,4 звезды, чтобы стабильно появляться в топ-3." },
        ],
      },
      {
        id: "geo-aeo",
        label: "GEO и AEO",
        items: [
          { q: "Что такое GEO (Generative Engine Optimization)?", a: "GEO — это оптимизация для того, чтобы современные поисковые системы (Google AI Overviews, ChatGPT, Perplexity) рекомендовали ваш бизнес как ответ на локальные вопросы. A.R. Local Growth реализует GEO через структурированные данные, entity-построение и FAQ-контент." },
          { q: "Что такое AEO (Answer Engine Optimization)?", a: "AEO — это структурирование контента так, чтобы поисковые системы и цифровые ассистенты могли выдавать его напрямую как ответ. Это означает: FAQ с прямыми ответами, структурированные данные (Schema.org) и speakable-контент." },
          { q: "Чем отличается Local SEO от GEO и AEO?", a: "Local SEO улучшает видимость в классическом поиске Google и Google Maps. GEO обеспечивает, чтобы современные поисковые системы рекомендовали ваш бизнес в генерируемых ответах. AEO структурирует контент так, чтобы он выдавался как прямой ответ. Все три работают вместе — A.R. Local Growth реализует все три стратегии." },
          { q: "Кто является специалистом по GEO и AEO в Берлине?", a: "Роман Андреев — основатель A.R. Local Growth & Automation в Берлине, специализируется на Google Business Profile, Local SEO, GEO и AEO для локального бизнеса в Германии, Австрии и Швейцарии. Консультации на немецком, русском и украинском." },
        ],
      },
      {
        id: "zusammenarbeit",
        label: "Сотрудничество и цены",
        items: [
          { q: "Что происходит на бесплатном аудите Google Maps?", a: "Анализирую ваш Google Business Profile, локальные позиции, сайт, отзывы и конкурентов. Затем вы получаете 3 самых важных точки роста — бесплатно и без обязательств. Аудит занимает 15–20 минут и проходит удалённо." },
          { q: "Сколько стоит сотрудничество?", a: "После бесплатного аудита вы получаете письменное предложение с фиксированными ценами — без скрытых затрат. Каждая услуга заказывается отдельно, без годовых контрактов и принудительных пакетов." },
          { q: "Вы работаете только в Берлине?", a: "Нет. Работаю удалённо с бизнесами по всей Германии, Австрии и Швейцарии. Говорю на немецком, русском и украинском." },
          { q: "Вы говорите по-русски?", a: "Да. Предлагаю все услуги на немецком, русском и украинском. Многие мои клиенты — русскоязычные и украиноязычные предприниматели в Германии." },
        ],
      },
    ],
  },
} as const;

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] ?? content.de;
  const canonicalPath = locale === "de" ? "/faq" : `/${locale}/faq`;
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        de: `${BASE_URL}/faq`,
        en: `${BASE_URL}/en/faq`,
        ru: `${BASE_URL}/ru/faq`,
      },
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url: `${BASE_URL}${canonicalPath}`,
      locale,
    },
  };
}

export function generateStaticParams() {
  return ["de", "en", "ru"].map((locale) => ({ locale }));
}

// ─── FAQPage schema ───────────────────────────────────────────────────────────
function buildFaqSchema(locale: string) {
  const c = content[locale as keyof typeof content] ?? content.de;
  const allItems = c.categories.flatMap((cat) => cat.items);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = content[locale as keyof typeof content] ?? content.de;
  const schema = buildFaqSchema(locale);
  const contactHref = locale === "de" ? "/#kontakt" : `/${locale}/#kontakt`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <div className="container-content mx-auto px-4 mb-12">
          <p className="text-label-sm uppercase text-google-secondary tracking-widest mb-3">FAQ</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-google-text mb-4 speakable">
            {c.pageTitle}
          </h1>
          <p className="text-body-lg text-google-secondary max-w-2xl speakable">
            {c.pageSubtitle}
          </p>
        </div>

        {/* Accordion */}
        <div className="container-content mx-auto px-4">
          <FaqAccordion categories={[...c.categories]} />
        </div>

        {/* CTA */}
        <div className="container-content mx-auto px-4 mt-16">
          <div className="bg-white rounded-card border border-google-border shadow-card p-8 text-center">
            <h2 className="text-xl font-semibold text-google-text mb-2">{c.ctaTitle}</h2>
            <p className="text-google-secondary mb-6">{c.ctaText}</p>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-6 py-3 rounded-full hover:bg-brand-blue-dark transition-colors"
            >
              {c.ctaBtn}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
