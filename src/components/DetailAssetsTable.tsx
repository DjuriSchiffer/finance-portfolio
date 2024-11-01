import React from 'react';
import { Button } from 'flowbite-react';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import Table from '../components/Table';
import TableRow from '../components/TableRow';
import { Asset, SelectedCurrency } from '../types/currency';
import { CurrencyQuote } from 'api';

interface DetailAssetsTableProps {
    selectedCurrency?: SelectedCurrency;
    fetchedCurrencies: any[];
    currentFetchedCurrency: any;
    currencyQuote: keyof CurrencyQuote;
    onEditAsset: (asset: Asset) => void;
    onRemoveAsset: (asset: Asset) => void;
}

const DetailAssetsTable: React.FC<DetailAssetsTableProps> = ({
    selectedCurrency,
    fetchedCurrencies,
    currentFetchedCurrency,
    currencyQuote,
    onEditAsset,
    onRemoveAsset,
}) => {
    if (!selectedCurrency || selectedCurrency.assets.length === 0) {
        return (
            <div className="text-white flex items-center justify-center h-40">
                <span>No assets added yet.</span>
            </div>
        );
    }

    return (
        <Table type="overview">
            {selectedCurrency.assets.map((asset: Asset) => (
                <TableRow
                    key={asset.id}
                    type="overview"
                    item={asset}
                    currencies={fetchedCurrencies}
                    currentCurrency={currentFetchedCurrency}
                    currencyQuote={currencyQuote}
                >
                    <Button
                        size="sm"
                        onClick={() => onEditAsset(asset)}
                        className="mr-2"
                    >
                        <FaPen color="white" />
                    </Button>
                    <Button
                        size="sm"
                        color="failure"
                        onClick={() => onRemoveAsset(asset)}
                    >
                        <FaTrashAlt color="white" />
                    </Button>
                </TableRow>
            ))}
        </Table>
    );
};

export default DetailAssetsTable;