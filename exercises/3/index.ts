interface IPayment {
    sum: number,
    from: number,
    to: number
}

interface IPaymentsRequest extends IPayment { }

enum PaymentStatus {
    Success = 'success',
    Failed = 'failed'
}

interface IDataSuccess extends IPayment {
    databaseId: number,
}

interface IDataFailed {
    errorMessage: string,
    errorCode: number
}

// !!! bad practise !!!
interface IPaymentsResponse {
    status: PaymentStatus,
    data: IDataSuccess | IDataFailed
}

interface IResponseSuccess {
    status: PaymentStatus.Success,
    data: IDataSuccess
}

interface IResponseFailed {
    status: PaymentStatus.Failed,
    data: IDataFailed
}

function get(): IResponseSuccess | IResponseFailed {
    return {} as unknown as IResponseSuccess
}


type Res = IResponseSuccess | IResponseFailed;

type f = (res: Res) => number;

// Type Guard
function isSuccess(res: Res): res is IResponseSuccess {
    return res.status === PaymentStatus.Success;
}

const getBaseId: f = (res) => {
    if (isSuccess(res)) {
        return res.data.databaseId;
    } else {
        throw new Error(res.data.errorMessage)
    }
}