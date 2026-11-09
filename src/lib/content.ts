import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Socials = {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  zalo?: string;
};

export type Teacher = {
  slug: string;
  name: string;
  photo?: string;
  title: string;
  specialties: string[];
  bio: string;
  certifications: string[];
  socials: Socials;
  featured: boolean;
  bodyHtml: string;
};

export type Workshop = {
  slug: string;
  title: string;
  teacher: string;
  startAt: Date;
  endAt: Date;
  timezone: string;
  format: "online" | "offline";
  location?: string;
  zoomUrl?: string;
  registrationUrl?: string;
  price: number;
  capacity?: number;
  cover?: string;
  description: string;
  bodyHtml: string;
};

function readDir(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), "utf8");
      const { data, content } = matter(raw);
      return { file: f, data, bodyHtml: marked.parse(content, { async: false }) as string };
    });
}

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

/** Giờ trong file được hiểu là giờ Việt Nam (UTC+7) nếu không ghi múi giờ. */
function parseVnDate(v: unknown): Date {
  if (v instanceof Date) return v;
  const s = String(v).trim();
  const hasZone = /(Z|[+-]\d{2}:?\d{2})$/.test(s);
  const withSeconds = /T\d{2}:\d{2}$/.test(s) ? `${s}:00` : s;
  return new Date(hasZone ? withSeconds : `${withSeconds}+07:00`);
}

export function getTeachers(): Teacher[] {
  return readDir("teachers")
    .map(({ file, data, bodyHtml }) => ({
      slug: str(data.slug) ?? file.replace(/\.mdx?$/, ""),
      name: String(data.name ?? ""),
      photo: str(data.photo),
      title: String(data.title ?? ""),
      specialties: (data.specialties ?? []) as string[],
      bio: String(data.bio ?? ""),
      certifications: (data.certifications ?? []) as string[],
      socials: (data.socials ?? {}) as Socials,
      featured: Boolean(data.featured),
      bodyHtml,
    }))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "vi"));
}

export function getTeacher(slug: string) {
  return getTeachers().find((t) => t.slug === slug);
}

export function getWorkshops(): Workshop[] {
  return readDir("workshops")
    .map(({ file, data, bodyHtml }) => ({
      slug: str(data.slug) ?? file.replace(/\.mdx?$/, ""),
      title: String(data.title ?? ""),
      teacher: String(data.teacher ?? ""),
      startAt: parseVnDate(data.startAt),
      endAt: parseVnDate(data.endAt ?? data.startAt),
      timezone: str(data.timezone) ?? "Asia/Ho_Chi_Minh",
      format: (data.format === "offline" ? "offline" : "online") as Workshop["format"],
      location: str(data.location),
      zoomUrl: str(data.zoomUrl),
      registrationUrl: str(data.registrationUrl),
      price: Number(data.price ?? 0),
      capacity: data.capacity ? Number(data.capacity) : undefined,
      cover: str(data.cover),
      description: String(data.description ?? ""),
      bodyHtml,
    }))
    .sort((a, b) => a.startAt.getTime() - b.startAt.getTime());
}

export function getUpcomingWorkshops(teacherSlug?: string, now = new Date()) {
  return getWorkshops().filter(
    (w) => w.endAt >= now && (!teacherSlug || w.teacher === teacherSlug),
  );
}
