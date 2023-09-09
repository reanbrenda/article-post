import code1 from "../Images/2.jpg";
import ssrs from "../Images/report.jpg";
import payment from "../Images/pay.jpg";
import payment2 from "../Images/payment.jpg";
import tfs from "../Images/team.jpg";
import commit from "../Images/commit.png";
import TFS2 from "../Images/TFS1.png";
import TFS3 from "../Images/TFS3.png";
import TFS4 from "../Images/TFS4.png";
import TFS6 from "../Images/TFS6.png";
import approver from "../Images/approver.png";
import number from "../Images/number.JPG";
import temp1 from "../Images/temp1.png";
import numseq from "../Images/numseq.JPG";
import pos from "../Images/pos.jpg";



export default [
  {
    id: 1,
    title: "Number Sequence",
    image: code1,
    description:
      "In this article, I will present a detailed guide on implementing number sequences in D365 Finance and Operations. We will go through the step-by-step process to achieve this functionality successfully.",
    steps: [
      {
        title: "Identify the field",
        description:
          "First, we need to identify which field on a table should use a number sequence.",
        codeSnippet: "NULL",
        image: numseq,
      },
      {
        title: "Develop NumberSeqApplicationModule Class",
        description: `Next, to develop a D365 number sequence, in Visual Studio create a new class that extends NumberSeqApplicationModule. This class will contain the code needed to add a row to the ‘Number sequence’ tab on a parameters form. This ‘number sequence reference‘ allows the user to specify which ‘number sequence code‘ should be used for that field.`,
        codeSnippet: `
public class CustomerIdNumSeq extends NumberSeqApplicationModule
{
}
  
`,
        image: "NULL",
      },
      {
        title: "Implement buildModulesMapSubsciber Method",
        description: `Next, add the following method and code. It isn’t really important to understand this method. It is used to add your EDT to the list of number sequence references. Replace, the text inside ‘classnum(TutCarIdNumSeq)’ which the name of your class.`,
        codeSnippet: `
[SubscribesTo(classstr(NumberSeqGlobal),delegatestr(NumberSeqGlobal,buildModulesMapDelegate))]
    static void buildModulesMapSubsciber(Map numberSeqModuleNamesMap)
    {
        NumberSeqGlobal::addModuleToMap(classnum(tutCarIdNumSeq), numberSeqModuleNamesMap);
    }
`,
        image: "NULL",
      },
      {
        title: "Implement numberSeqModule Method",
        description: `In my example, the form TutCar, shows the data in the table TutCar. And, this form exists in the Accounts Receivable module in D365. Therefore, I will add code that uses the ‘Cust’ value of the ‘NumberSeqModule‘ enum.`,
        codeSnippet: `
public NumberSeqModule numberSeqModule()
    {
        return NumberSeqModule::Cust;
    }
`,
        image: "NULL",
      },
      {
        title: "Implement loadModule Method",
        description: `Lastly, a key step in order to develop a D365 number sequence is to define what scope and parameters should be used. Add the ‘loadModule‘ method following the example below. Then, replace ‘TutCarId‘ in the example, with the name of your EDT. Also, add ‘Reference help‘ text that will help the user know which number sequence they are setting up. This should be changed to use a Label, instead of plain text.`,
        codeSnippet: `
protected void loadModule()
{
    NumberSeqDatatype datatype = NumberSeqDatatype::construct();

    datatype.parmDatatypeId(extendedTypeNum(TutCarId));
    datatype.parmReferenceHelp(literalStr("Unique key used for the cars."));
    datatype.parmWizardIsContinuous(false);
    datatype.parmWizardIsManual(NoYes::No);
    datatype.parmWizardFetchAheadQty(10);
    datatype.parmWizardIsChangeDownAllowed(NoYes::No);
    datatype.parmWizardIsChangeUpAllowed(NoYes::No);
    datatype.parmSortField(1);

    datatype.addParameterType(NumberSeqParameterType::DataArea, true, false);
    this.create(datatype);
}
`,
        image: "NULL",
      },
      {
        title: "Create Runnable Class (Job)",
        description: `After adding the new class that extends NumberSeqApplicationModule, we need to actually run the loadModule method inside of it. As a result, this will create a record in the ‘Number sequence’ tab of the parameters form in the module we specified.`,
        codeSnippet: `
class tutLoadCarIdNumSeq
{
    /// <summary>
    /// Runs the class with the specified arguments.
    /// </summary>
    /// <param name = "_args">The specified arguments.</param>
    public static void main(Args _args)
    {
        tutCarIdNumSeq tutCarIdNumSeq = new tutCarIdNumSeq();
        tutCarIdNumSeq.load();
    }

}
`,
        image: "NULL",
      },
      {
        title: "Override The Create Method",
        description: `Until now, the number sequence was not fully defined and setup for use. But now, we can complete the final step needed to develop a D365 number sequence. Whenever, a new record is created on our form, we want the system to generate a new unique number.`,
        codeSnippet: 
        `
  public void create(boolean _append = false)
  {
      TutCarId tutCarId;
      NumberSequenceReference numberSequenceReference;

      super(_append);

      numberSequenceReference = NumberSeqReference::findReference(extendedTypeNum(TutCarId));
      if (numberSequenceReference)
      {
          tutCarId = NumberSeq::newGetNum(numberSequenceReference).num();
          TutCar.CarId = tutCarId;
      }
  }
        `,
        image: "NULL",
      },
      {
        title: "Conclusion",
        description: `In this article you learned how to develop a D365 number sequence. While there are a number of steps involved, they are the same each time. Therefore, feel free to come back to this guide any time you need to develop a new number sequence.`,
        codeSnippet: `NULL`,
        image: number,
      },
    ],
    author: {
      name: "Brenda Mukindia",
      email: "Mukindia67@gmail.com",
      profile: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg",
      role: "D365 Developer",
    },
    dateOfCreation: "2023-07-26",
  },

  {
    id: 2,
    title: "Adding approver details in SSRS Report",
    image: tfs,
    description:
      "Adding approver details in SSRS reports in D365 Finance and Operations involves customizing the report to fetch and display information about the approver(s) associated with a specific transaction or record",
    steps: [
      {
        title: "Creating a temp table",
        description:
          "Create a temporary table and add the fields that will be used to store the approver details. The fields are shown in the screenshot below",
        codeSnippet: "NULL",
        image: approver,
      },
      {
        title: "Create a Data Fetching Class",
        description: `Create a new class or use the existing class that fetches the data from the respective table and retrieves the information about the approver(s) for the specific transaction or record.
        Ensure that the class has methods to query the database and return the necessary information about the approver(s).`,
        codeSnippet: `class getApproverDetails
{
  public static void addApprovals(TableId tableid,RecId recid,IBS_PVApprovalsTmp _appTmp)
  {
      container approvals;
      container appList,appList2;
      int counter;
      WorkflowTrackingStatusTable trackingStatusTable;
      WorkflowVersionTable versionTable;
      WorkflowElementTable elementTable;
      WorkflowTrackingTable trackingTable;
      WorkflowStepTable     stepTable;
      Name name;
      Name stepName;
      UserInfo userinfo;
      Recid trackingStatusRecid;

        select firstOnly RecId from trackingStatusTable order by RecId desc where trackingStatusTable.ContextRecId == recid && trackingStatusTable.TrackingStatus ==  WorkflowTrackingStatus::Completed
&& trackingStatusTable.ContextTableId == tableid;
        trackingStatusRecid = trackingStatusTable.RecId;

        counter = 1;
        while select * from trackingTable order by trackingTable.createdDateTime asc join stepTable where stepTable.RecId == trackingTable.WorkflowStepTable && trackingTable.WorkflowTrackingStatusTable == trackingStatusRecid
&& trackingTable.TrackingContext== WorkflowTrackingContext::WorkItem && trackingTable.TrackingType ==  WorkflowTrackingType::Approval && stepTable.Name != ""
        {
            select * from userinfo  where userinfo.id ==  trackingTable.User;
            _appTmp.clear();
            _appTmp.ApproverName = userinfo.name;
            _appTmp.ApprovalTime = trackingTable.createdDateTime;
            _appTmp.Sign = HCMWorkerSignature1::workerSign(HcmWorker::userId2Worker(trackingTable.User));
            _appTmp.Designation = HcmWorker::find(HcmWorker::userId2Worker(trackingTable.User)).title();
            if(counter == 1)
            {
                _appTmp.ApprovalName = "Checked by"; // 
            }
            else
            {
                _appTmp.ApprovalName = "Approved by";
            }
            _appTmp.insert();
            counter++;
        }
    }
  `,
        image: "NULL",
      },
      {
        title: "Reference the Data Fetching Class in the Data Provider",
        description: `Open the data provider class (e.g., CustVendInvoiceDP or any other relevant data provider class) that you are using for the SSRS report.
        Inside the process report method, create an instance of the ApproverDataFetcher class.
        Call the appropriate method from the ApproverDataFetcher class to retrieve the approver details based on the transaction or record.`,
        codeSnippet: 
`
//Add this line of code
getApproverDetails::addApprovals(tableNum(IBSCustomerTable), IBSCustomerTable.RecId, IBSCustomerTableTmp);
        `,
        image: "NULL",
      },
      {
        title: "Conclusion",
        description: `You're almost done! Next, integrate the newly fetched data source into the report dataset and incorporate the approver fields into the report. Once deployed, the report will display the approver details seamlessly..`,
        codeSnippet: `NULL`,
        image: "NULL",
      },
    ],
    author: {
      name: "Brenda Mukindia",
      email: ".kibet@gmail.com",
      profile: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg",
      role: "D365 Developer",
    },
    dateOfCreation: "2023-07-26",
  },
  {
    id: 3,
    title: "Push & Pull changes using Team Foundation Service (TFS)",
    image: commit,
    description:
      "In this article, we are going to implement Pushing and Pulling changes using Team Foundation Service (TFS) in Visual Studio for Dynamics 365 Finance and Operations",
    steps: [
      {
        title: "Setting up Version Control in D365FO Project",
        description: `Open Visual Studio and navigate to your D365FO project solution.
          Right-click on the project node in Solution Explorer and select Add Solution to Source Control."
          Choose Team Foundation Server as the version control system and click OK
          Connect to your TFS repository by providing the necessary credentials`,
        codeSnippet: "NULL",
        image: TFS2,
      },
      {
        title: "Working with Version Control in Visual Studio",
        description: `Before making any changes, ensure you have the latest version of the code by performing a "Get Latest Version" operation. This ensures you are working on the most recent codebase.
        Make the necessary changes to your D365FO project in Visual Studio.
        Once you have completed your changes, save your work, and build the project to ensure there are no build errors`,
        codeSnippet: `NULL`,
        image: TFS3,
      },
      {
        title: "Pushing Changes to TFS",
        description: `Right-click on the project node in Solution Explorer and select "Check-in."
        Review the list of pending changes and provide a meaningful comment describing the changes made.
        Click "Check In" to push your changes to TFS. This saves your changes to the central repository, making them available to other team members.`,
        codeSnippet: `NULL`,
        image: TFS4,
      },
      {
        title: "Pulling Changes from TFS",
        description: `Before starting work on a new task or feature, ensure you have the latest codebase by performing a "Get Latest Version" operation from TFS.
        Right-click on the project node in Solution Explorer and select "Get Latest Version." This operation retrieves the latest changes made by other team members and merges them into your local codebase.
        Resolve any conflicts that may occur during the merge process. Visual Studio provides tools to help you resolve conflicts and keep the codebase consistent..`,
        codeSnippet: `NULL`,
        image: TFS6,
      },
      {
        title: "Conclusion",
        description: `These four steps cover the basics of pushing and pulling changes using Team Foundation Service in Visual Studio for D365 Finance and Operations.
         By following these steps, developers can work collaboratively, manage version control effectively, and ensure a smooth development process. Regularly pushing 
         and pulling changes from TFS helps maintain code integrity and promotes a streamlined development workflow.`,
        codeSnippet: `NULL`,
        image: `NULL`,
      },
    ],
    author: {
      name: "Brenda Mukindia",
      email: "Mukindia67@gmail.com",
      profile: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg",
      role: "D365 Developer",
    },
    dateOfCreation: "2023-08-04",
  },
  {
    id: 4,
    title: "SSRS Report",
    image: ssrs,
    description:
      "In this article, we'll walk you through the process of creating a custom SSRS report from scratch in D365 Finance and Operations. With just four simple steps, you'll be able to develop your own SSRS report seamlessly. Let's get started! ",
    steps: [
      {
        title: "Create a temporary table",
        description: `Open Visual Studio and create a new project of type "Dynamics 365 Finance and Operations Model".
        Add a new item of type "Table" to the project. This will create a new AX Table in the Application Object Tree (AOT).
        Define the necessary fields in the table, which will represent the data that you want to display in the report.
        Add attributes such as Data Sources and Data Fields to the table to specify how the data will be retrieved and displayed.`,
        codeSnippet: "NULL",
        image: temp1,
      },
      {
        title: "Create a Contract Class",
        description: `Add a new item of type "Class" to the project, and name it "ReportContract".
        Define the required data members in the class, which will act as the parameters that the user can input while running the report.
        Decorate the data members with appropriate attributes, such as "DataMemberAttribute" to indicate that they are report parameters.
        Define any necessary methods in the class to handle data validation or other business logic related to the report parameters.`,
        codeSnippet: `class PurchaseOrderContract
{
      PurchId purchId;
      [DataMemberAttribute('Purchase Id')]
      public PurchId parmPurchId(PurchId _purchId = PurchId)
      {
          purchId = _purchId;
          return purchId;
      }
}
    `,
        image: "NULL",
      },
      {
        title: "Controller Class",
        description:
          "A Controller class orchestrates the report execution. In our case, the controller will handle whether the report dialog form should open, set up the SSRS report design and the value of the hidden parameter. Each controller class should extend SrsReportRunController (SrsPrintMgmtController or SrsPrintMgmtFormLetterController for Print Management reports)",
        codeSnippet: `
class DocAgreementDocumentController extends SrsReportRunController
{
public static DocAgreementDocumentController construct()
{
  return new DocAgreementDocumentController();
}

public static void main(Args _args)
{
  DocAgreementDocumentController docAgreementDocumentController = 
      DocAgreementDocumentController::construct();                                         
  docAgreementDocumentController.parmReportName(ssrsReportStr(DocAgreementDocument, Report));
  docAgreementDocumentController.parmArgs(_args);
  docAgreementDocumentController.parmDialogCaption("Sales agreement document");
  docAgreementDocumentController.startOperation();
}

protected void prePromptModifyContract()
{
  DocAgreementDocumentContract contract = this.parmReportContract().parmRdpContract();

  // Set the hidden parameter value.
  contract.parmSalesAgreementRecId(args.record().RecId);

  // Set the report design name.
  this.parmReportContract().parmReportName(ssrsReportStr(DocAgreementDocument, Report));

  boolean isPreview = args.menuItemName() == menuItemOutputStr(DocAgreementDocumentPreview);

  // Set the target print destination to Screen if we are previewing the report.
  if (isPreview)
  {
      this.parmReportContract().parmPrintSettings().printMediumType(SRSPrintMediumType::Screen);
  }

  // Don't show the report dialog if the report menu item is DocAgreementDocumentPreview
  // and don't save to SysLastValue either.
  this.parmShowDialog(!isPreview);
  this.parmLoadFromSysLastValue(!isPreview);
}
}
  `,
        image: "NULL",
      },
      {
        title: "Data Provider Class",
        description: `A Data Provider class should extend SRSReportDataProviderBase (or SrsReportDataProviderPreProcess for pre-processed reports) and implement at least the processReport() method. Each Data Provider class is decorated with the SRSReportParameterAttribute attribute that points to a particular Data Contract class, and optionally with the SRSReportQueryAttribute attribute that points to a dynamic query if such exists. Additionally, for each of the data sets a method decorated with the SRSReportDataSetAttribute attribute should be implemented. The processReport() method is called by Reporting Services to fetch the report data and fill the temporary tables.`,
        codeSnippet: `
[SRSReportParameterAttribute(classStr(DocAgreementDocumentContract))]
class DocAgreementDocumentDP extends SRSReportDataProviderBase
{
    // Contains Agreement header data.
    DocAgreementHeader  docAgreementHeader;
    
    // Contains Agreement lines data.
    DocAgreementLine    docAgreementLine;
  
    // Contains Agreement customer contact data.
    DocAgreementContact docAgreementContact;
  
    
    [SRSReportDataSetAttribute(tablestr(DocAgreementHeader))]
    public DocAgreementHeader getDocAgreementHeader()
    {
        select docAgreementHeader;
        return docAgreementHeader;
    }
    
    [SRSReportDataSetAttribute(tablestr(DocAgreementLine))]
    public DocAgreementLine getDocAgreementLine()
    {
        select docAgreementLine;
        return docAgreementLine;
    }
  
    [SRSReportDataSetAttribute(tablestr(DocAgreementContact))]
    public DocAgreementContact getDocAgreementContact()
    {
        select docAgreementContact;
        return docAgreementContact;
    }
  
    /// <summary>
    /// Process report data.
    /// </summary>
    public void processReport()
    {
        DocAgreementDocumentContract contract;
        SalesAgreementHeader salesAgreementHeader;
  
        contract = this.parmDataContract() as DocAgreementDocumentContract;
  
        // Get sales agreement header record from the contract parameter
        salesAgreementHeader = 
            SalesAgreementHeader::find(contract.parmSalesAgreementRecId());
        
        if (salesAgreementHeader)
        {
            // Populate sales agreement header
            this.populateSalesAgreementHeader(salesAgreementHeader);
  
            // Populate sales agreement line
            this.populateSalesAgreementLine(salesAgreementHeader);
  
            // Populate sales agreement customer contacts
            this.populateSalesAgreementCustomerContact(salesAgreementHeader);
        }
    }
  
    ...
}
  `,
        image: "NULL",
      },
      {
        title: "Conclusion",
        description: `Save all the changes and build the project to verify that there are no errors.
        Deploy the report project to the Dynamics 365 Finance and Operations environment.
        Open the Dynamics 365 Finance and Operations client, navigate to the report section, and run the report.
        Use the ReportContract class to input any necessary parameters while running the report.
        The report will display the data fetched from the temporary table, and you can design the report layout as per your requirements.
        After verifying the report's design and data, deploy the report to make it available to other users.
        That's it! You have successfully created an SSRS report in D365 Finance and Operations.`,
        codeSnippet: "NULL",
        image: "NULL",
      },
    ],
    author: {
      name: " Kibet",
      email: "Mukindia67@gmail.com",
      profile: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg",
      role: "D365 Developer",
    },
    dateOfCreation: "2023-07-26",
  },

  {
    id: 5,
    title: "Payment Integration",
    image: payment,
    description:
      "This article describes how to create an end-to-end payment integration in Microsoft Dynamics 365 Commerce Store Commerce for a payment terminal that can directly communicate with the payment gateway.",
    steps: [
      {
        title: "Overview",
        description:
          "The following illustration shows a high-level overview of the payment terminal integration through the POS. Although this illustration assumes that a local Hardware Station is used to communicate with the payment terminal, the same patterns apply to a shared Hardware Station.",
        codeSnippet: `NULL`,
        image: payment2,
      },
      {
        title: "Implement the INamedRequestHandler interface",
        description:`All POS payment-related flows are handled through request/response patterns in the Hardware Station. The first step in the process of writing a new payment connector is to create a class that implements the INamedRequestHandler interface that is defined in the Microsoft.Dynamics.Commerce.Runtime.Framework library.`,
               codeSnippet: `
  namespace Contoso.Commerce.HardwareStation.PaymentSample 
  { 
      public class PaymentDeviceSample : INamedRequestHandler
      {
          private const string PaymentTerminalDevice = "MOCKPAYMENTTERMINAL";
  
          /// <summary>
          /// Gets the specify the name of the request handler.
          /// </summary>
          public string HandlerName
          {
                get
              {
                  return PaymentDeviceSample.PaymentTerminalDevice;
              }
          }
      }
  }
  `,
        image: "NULL",
      },
      {
        title: "Implement supported payment requests",
        description:
        `To process payment-related flows, the payment connector must define the supported request types that it can handle. Additionally, the Execute method must be implemented to route each request that the connector supports to a given method. The following example shows the complete list of supported request types and an example of a specific request (that is, an authorize request)`,
             codeSnippet:
              `
namespace Contoso.Commerce.HardwareStation.PaymentSample 
{ 
  /// <summary>
  /// <c>Simulator</c> manager payment device class.
  /// </summary>
  public class PaymentDeviceSample : INamedRequestHandler
  {
      /// <summary>
      /// Gets the collection of supported request types by this handler.
      /// </summary>
      public IEnumerable<Type> SupportedRequestTypes
      {
          get
          {
              return new[]
              {
                      typeof(LockPaymentTerminalDeviceRequest),
                      typeof(OpenPaymentTerminalDeviceRequest),
                      typeof(ClosePaymentTerminalDeviceRequest),
                      typeof(BeginTransactionPaymentTerminalDeviceRequest),
                      typeof(EndTransactionPaymentTerminalDeviceRequest),
                      typeof(UpdateLineItemsPaymentTerminalDeviceRequest),
                      typeof(AuthorizePaymentTerminalDeviceRequest),
                      typeof(CapturePaymentTerminalDeviceRequest),
                      typeof(VoidPaymentTerminalDeviceRequest),
                      typeof(RefundPaymentTerminalDeviceRequest),
                      typeof(FetchTokenPaymentTerminalDeviceRequest),
                      typeof(ExecuteTaskPaymentTerminalDeviceRequest),
                      typeof(ActivateGiftCardPaymentTerminalRequest),
                      typeof(AddBalanceToGiftCardPaymentTerminalRequest),
                      typeof(GetGiftCardBalancePaymentTerminalRequest),
                      typeof(GetPrivateTenderPaymentTerminalDeviceRequest),
                      typeof(CancelOperationPaymentTerminalDeviceRequest),
                      typeof(GetTransactionReferencePaymentTerminalDeviceRequest),
                      typeof(GetTransactionByTransactionReferencePaymentTerminalDeviceRequest),
                      typeof(CashoutGiftCardPaymentTerminalRequest)
              };
          }
      }


      /// <summary>
      /// Executes the payment device simulator operation based on the incoming request type.
      /// </summary>
      /// <param name="request">The payment terminal device simulator request message.</param>
      /// <returns>Returns the payment terminal device simulator response.</returns>
      public Response Execute(Microsoft.Dynamics.Commerce.Runtime.Messages.Request request)
      {
          ThrowIf.Null(request, "request");

          Type requestType = request.GetType();

          if (requestType == typeof(AuthorizePaymentTerminalDeviceRequest))
          {
              return this.AuthorizePayment((AuthorizePaymentTerminalDeviceRequest)request);
          }
          else if (...)
          {
              ...
          }

          return new NullResponse();
      }

      /// <summary>
      /// Authorize payment.
      /// </summary>
      /// <param name="request">The authorize payment request.</param>
      /// <returns>The authorize payment response.</returns>
      public AuthorizePaymentTerminalDeviceResponse AuthorizePayment(AuthorizePaymentTerminalDeviceRequest request)
      {
          ThrowIf.Null(request, "request");

          PaymentInfo paymentInfo = Utilities.WaitAsyncTask(() => this.AuthorizePaymentAsync(request.Amount, request.Currency, request.VoiceAuthorization, request.IsManualEntry, request.ExtensionTransactionProperties));

          return new AuthorizePaymentTerminalDeviceResponse(paymentInfo);
      }
  }
}
  `,
        image: "NULL",
      },
      {
        title: "Configure the payment connector",
        description: "To determine the correct payment connector that should be loaded on the POS, you must set the value of the PaymentTerminalDevice property in the Device name field on the PIN pad FastTab of the POS hardware profile page in the client, as shown in the following illustration.",
        codeSnippet: "NULL",
        image: pos
      },
      {
        title: "Conclusion",
        description: "To handle merchant properties that are related to payment flows, the IPaymentProcessor interface that is defined in the Microsoft.Dynamics.Retail.PaymentSDK library must be implemented. The following example shows how to implement the two required interface methods, GetMerchantAccountPropertyMetadata and ValidateMerchantAccount. Other interface methods can be left blank (for example, they can return FeatureNotSupportedException).",
        codeSnippet: "NULL",
        image: "NULL"
      },
      

    ],
    author: {
      name: "Brenda Mukindia",
      email: "Mukindia67@gmail.com",
      profile: "https://james,mwangi",
      role: "D365 Developer",
    },
    dateOfCreation: "2023-07-26",
  },
];
