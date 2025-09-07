import React from 'react';
import { Link } from 'react-router-dom'; // Ganti dengan `next/link` jika pakai Next.js
import { ChevronRight } from 'lucide-react'; // Ikon opsional
import Typography from '../atoms/Typography';

type BreadcrumbItem = {
    label: string;
    href?: string; // Jika tidak ada, dianggap sebagai item terakhir (aktif)
};

type BreadcrumbProps = {
    items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <Typography variant="body-medium-regular" className="mb-4">
            <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return (
                            <li key={index} className="flex items-center gap-2">
                                {!isLast && item.href ? (
                                    <Link to={item.href} className="hover:underline text-blue-600">
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-gray-800 font-semibold ">{item.label}</span>
                                )}
                                {!isLast && <ChevronRight className="w-4 h-4 text-gray-400" />}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </Typography>


    );
};

export default Breadcrumb;