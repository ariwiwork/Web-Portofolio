"use server";

export async function getYoutubeVideoData(url: string) {
  try {
    // Gunakan YouTube oEmbed API untuk Title & Thumbnail
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const res = await fetch(oembedUrl, { next: { revalidate: 3600 } });
    
    let title = "Judul Tidak Ditemukan";
    let thumbnail = "https://via.placeholder.com/640x360?text=No+Thumbnail";
    
    if (res.ok) {
      const data = await res.json();
      title = data.title || title;
      thumbnail = data.thumbnail_url || thumbnail;
    }

    // Scraping HTML untuk mendapatkan jumlah views
    let views = "N/A";
    const htmlRes = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" },
      next: { revalidate: 3600 }
    });

    if (htmlRes.ok) {
      const html = await htmlRes.text();
      const viewsMatch = html.match(/<meta itemprop="interactionCount" content="(\d+)">/);
      if (viewsMatch && viewsMatch[1]) {
        const viewCount = parseInt(viewsMatch[1], 10);
        if (viewCount >= 1000000) views = (viewCount / 1000000).toFixed(1) + "M";
        else if (viewCount >= 1000) views = (viewCount / 1000).toFixed(1) + "K";
        else views = viewCount.toString();
      }
    }

    return { title, thumbnail, views };
  } catch (error) {
    console.error("Error fetching YouTube Data:", error);
  }

  // Fallback
  return {
    title: "Gagal memuat judul",
    thumbnail: "https://via.placeholder.com/640x360?text=Error",
    views: "N/A",
  };
}

export async function getYoutubeChannelData(url: string) {
  // oEmbed tidak mendukung URL channel. 
  // Sebagai alternatif tanpa API Key, kita dapat mencoba scraping meta tag sederhana.
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
      },
      next: { revalidate: 3600 }
    });
    
    if (res.ok) {
      const html = await res.text();
      
      // Ekstrak title dan image dari og:meta
      const titleMatch = html.match(/<meta property="og:title" content="([^"]+)">/);
      const imageMatch = html.match(/<meta property="og:image" content="([^"]+)">/);
      
      const title = titleMatch ? titleMatch[1] : null;
      const image = imageMatch ? imageMatch[1] : null;

      // Hapus kata " - YouTube" dari title jika ada
      const cleanTitle = title ? title.replace(" - YouTube", "") : "Channel Tidak Ditemukan";

      // Ekstrak subscriber count dari ytInitialData
      let subs = "N/A";
      const subMatch = html.match(/"subscriberCountText":\{.*?"simpleText":"([^"]+)"\}/);
      if (subMatch && subMatch[1]) {
        subs = subMatch[1].replace(/ subscribers?/i, "").trim();
      } else {
        // Coba regex alternatif jika struktur berubah
        const subMatchAlt = html.match(/{"content":"([^"]+ subscribers?)"}/i);
        if (subMatchAlt && subMatchAlt[1]) {
          subs = subMatchAlt[1].split(" ")[0];
        }
      }

      return {
        name: cleanTitle,
        thumbnail: image || "https://via.placeholder.com/150",
        subs: subs !== "N/A" ? subs : "N/A", 
      };
    }
  } catch (error) {
    console.error("Error fetching YouTube channel HTML:", error);
  }

  // Fallback
  return {
    name: "Gagal memuat nama",
    thumbnail: "https://via.placeholder.com/150?text=Error",
    subs: "N/A",
  };
}
