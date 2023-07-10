import { type } from 'os';
import prismaDb from '../../../../prisma/prismacli';
import { NextRequest, NextResponse } from 'next/server';

type ZoneName = {
    id: string;
}


// delete  zone name with zonenameid
export async function DELETE(req: NextRequest,{params}:{params:ZoneName}, res: NextResponse) {
    const { id } = params;
    console.log("zonename id", id);
    try {
        // check if is empty
        if (!id) {
            return NextResponse.json({
                error: 'ZoneName id is required',
            });
        }
        // check if zonename already exists
        const zonenameexist = await prismaDb.zoneNames.findFirst({
            where: {
                id: id,
            },
            include: {
                zone: true,
            }
        });
        if (!zonenameexist) {
            return NextResponse.json({
                error: 'ZoneName does not exists',
            });
        }




        const zonename = await prismaDb.zoneNames.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json({
            message: `ZoneName  name deleted successfully for ${zonename?.name}`,
            zonename,
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Something went wrong',
        });
    }
}
