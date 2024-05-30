import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const JobTable = () => {
  return (
    <Table>
        <TableHeader>
          <TableRow >
            <TableHead className="w-[100px] font-bold ">#</TableHead>
            <TableHead className="w-[100px] font-bold">Date created</TableHead>
            <TableHead className="w-[100px] font-bold">Source</TableHead>
            <TableHead className="w-[100px] font-bold"></TableHead>
            <TableHead className="w-[100px] font-bold">Target</TableHead>
            <TableHead className="w-[100px] font-bold">Filename</TableHead>
            <TableHead className="w-[100px] font-bold">Words</TableHead>
            <TableHead className="w-[100px] font-bold">Provider</TableHead>
            <TableHead className="w-[100px] font-bold">Progress</TableHead>
            <TableHead className="w-[100px] font-bold">Due date</TableHead>
            <TableHead className="w-[100px] font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell >INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="size-14" >→</TableCell>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell >$250.00</TableCell>
          <TableCell >INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default JobTable;