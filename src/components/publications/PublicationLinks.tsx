'use client';

import { BookOpen, ExternalLink, FileText, Github, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Publication } from '@/types/publication';
import { cn } from '@/lib/utils';
import { useMessages } from '@/lib/i18n/useMessages';

interface PublicationLinksProps {
    publication: Publication;
    includeDoi?: boolean;
    compact?: boolean;
    inline?: boolean;
    className?: string;
}

interface PublicationLinkItem {
    key: string;
    href: string;
    label: string;
    icon: LucideIcon;
}

function normalizeHref(href?: string) {
    const normalized = href?.trim();
    return normalized || undefined;
}

export default function PublicationLinks({
    publication,
    includeDoi = false,
    compact = false,
    inline = false,
    className,
}: PublicationLinksProps) {
    const messages = useMessages();

    const candidates: Array<PublicationLinkItem | undefined> = [
        includeDoi && publication.doi
            ? {
                key: 'doi',
                href: `https://doi.org/${publication.doi}`,
                label: 'DOI',
                icon: ExternalLink,
            }
            : undefined,
        normalizeHref(publication.paper)
            ? {
                key: 'paper',
                href: normalizeHref(publication.paper)!,
                label: messages.publications.paper,
                icon: FileText,
            }
            : undefined,
        normalizeHref(publication.code)
            ? {
                key: 'code',
                href: normalizeHref(publication.code)!,
                label: messages.publications.code,
                icon: Github,
            }
            : undefined,
        normalizeHref(publication.demo)
            ? {
                key: 'demo',
                href: normalizeHref(publication.demo)!,
                label: messages.publications.demo,
                icon: Globe,
            }
            : undefined,
        normalizeHref(publication.docs)
            ? {
                key: 'docs',
                href: normalizeHref(publication.docs)!,
                label: messages.publications.docs,
                icon: BookOpen,
            }
            : undefined,
        normalizeHref(publication.website)
            ? {
                key: 'website',
                href: normalizeHref(publication.website)!,
                label: messages.publications.website,
                icon: Globe,
            }
            : undefined,
    ];

    const seen = new Set<string>();
    const links = candidates.filter((link): link is PublicationLinkItem => {
        if (!link || seen.has(link.href)) {
            return false;
        }
        seen.add(link.href);
        return true;
    });

    if (links.length === 0) {
        return null;
    }

    const renderedLinks = links.map(({ key, href, label, icon: Icon }) => (
        <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                'inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white font-medium text-neutral-700 transition-colors hover:border-accent hover:bg-accent hover:text-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
                compact ? 'h-7 gap-1.5 px-2.5 text-xs' : 'h-8 gap-2 px-3 text-sm'
            )}
        >
            <Icon className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
            <span>{label}</span>
        </a>
    ));

    if (inline) {
        return <>{renderedLinks}</>;
    }

    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            {renderedLinks}
        </div>
    );
}
