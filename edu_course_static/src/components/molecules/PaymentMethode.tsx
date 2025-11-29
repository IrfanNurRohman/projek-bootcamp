import { useState } from 'react';

// Interfaces should be defined before the component
interface PaymentMethod {
    id: string;
    name: string;
    logoUrl: string;
}

interface PaymentCategory {
    name: string;
    id: string;
    methods: PaymentMethod[];
}

// Main App component
const PaymentMethode = () => {
    const [openCategory, setOpenCategory] = useState<string | null>('Transfer Bank');
    const [selectedMethod, setSelectedMethod] = useState<string>('bca');

    const paymentCategories: PaymentCategory[] = [
        {
            name: 'Transfer Bank',
            id: 'bank',
            methods: [
                { id: 'bca', name: 'Bank BCA', logoUrl: '/images/bank-image/bank-bca.png' },
                { id: 'bni', name: 'Bank BNI', logoUrl: '/images/bank-image/bank-bni.png' },
                { id: 'bri', name: 'Bank BRI', logoUrl: '/images/bank-image/bank-bri.png' },
                { id: 'mandiri', name: 'Bank Mandiri', logoUrl: '/images/bank-image/bank-mandiri.png' },
            ],
        },
        {
            name: 'E-Wallet',
            id: 'ewallet',
            methods: [
                { id: 'dana', name: 'Dana', logoUrl: '/images/wallet-image/wallet-dana.png' },
                { id: 'ovo', name: 'OVO', logoUrl: '/images/wallet-image/wallet-ovo.png' },
                { id: 'linkaja', name: 'LinkAja', logoUrl: '/images/wallet-image/wallet-link-aja.png' },
                { id: 'shopeepay', name: 'Shopee Pay', logoUrl: '/images/wallet-image/wallet-shopee-pay.png' },
            ],
        },
        {
            name: 'Kartu Kredit/Debit',
            id: 'creditcard',
            methods: [
                { id: 'visa', name: 'VISA', logoUrl: '/images/credit-card/cc-visa.png' },
                { id: 'mastercard', name: 'Mastercard', logoUrl: '/images/credit-card/cc-master-card.png' },
                { id: 'jcb', name: 'JCB', logoUrl: '/images/credit-card/cc-jcb.png' },
            ],
        },
    ];

    const handleToggle = (categoryName: string) => {
        setOpenCategory(openCategory === categoryName ? null : categoryName);
    };

    const handleSelectMethod = (methodId: string) => {
        setSelectedMethod(methodId);
    };

    return (
        <div className=" font-sans w-full ">
            <div className="w-full h-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="p-2 bg-gray-50 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800">Metode Pembayaran</h1>
                </div>

                <div className="p-4 space-y-4 flex flex-col justify-center items-center">
                    {paymentCategories.map(category => (
                        <div key={category.id} className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm w-full">
                            <button
                                className="w-full flex justify-between items-center p-4 focus:outline-none hover:bg-gray-100 transition-colors"
                                onClick={() => handleToggle(category.name)}
                            >
                                <span className="text-lg font-medium text-gray-700">{category.name}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${openCategory === category.name ? 'rotate-180' : ''
                                        }`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {openCategory === category.name && (
                                <div className="p-2 space-y-2 border-t border-gray-200">
                                    {category.methods.map(method => (
                                        <div
                                            key={method.id}
                                            className={`flex items-center p-3 rounded-xl cursor-pointer transition-colors ${selectedMethod === method.id ? 'bg-indigo-50 border-2 border-indigo-400' : 'bg-white hover:bg-gray-100'
                                                }`}
                                            onClick={() => handleSelectMethod(method.id)}
                                        >
                                            <img src={method.logoUrl} alt={`${method.name} logo`} className=" rounded-md mr-4 scale-125" />
                                            <span className="flex-1 font-medium text-gray-800">{method.name}</span>
                                            {selectedMethod === method.id && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-green-500"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentMethode;